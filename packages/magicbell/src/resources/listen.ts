import WebSocket from 'isomorphic-ws';
import { v7 as uuidv7 } from 'uuid';

import { Client } from '../client/client';
import { debug, error, info } from '../client/log';
import { ASYNC_ITERATOR_SYMBOL, makeForEach } from '../client/paginate';
import { RequestOptions } from '../client/types';
import { isArray, isObject } from '../lib/utils';

type CreateTokenResponse = {
  in_app: {
    token: string;
  };
};

type Event = {
  id: string;
  timestamp: number;
  encoding: string;
  channel: string;
} & (
  | { name: 'notifications/new'; data: { id: string } }
  | { name: 'notifications/read'; data: { id: string; client_id: string } }
  | { name: 'notifications/read/all'; data: { client_id: string } }
  | { name: 'notifications/seen/all'; data: { client_id: string } }
  | { name: 'notifications/unread'; data: { id: string; client_id: string } }
  | { name: 'notifications/delete'; data: { id: string; client_id: string | null } }
);

type IterableEventSource<TNode> = {
  [Symbol.asyncIterator](): Iterator<TNode>;
  forEach(cb: (node: TNode, index: number) => void | boolean | Promise<void | boolean>): Promise<void>;
  close(): void;
};

export type Listener = (options?: RequestOptions) => IterableEventSource<Event>;

function parseMessageData(data) {
  try {
    const json = JSON.parse(data);
    // TODO: more bullet-proof message filtering
    if (!isObject(json) || isArray(json) || typeof json.name !== 'string') return null;
    return json;
  } catch {
    error('failed to parse message', data);
    return null;
  }
}

export function createListener(
  client: InstanceType<typeof Client>,
  args: {
    socketHost?: string;
  } = {},
): Listener {
  let socket: WebSocket;
  let _options: RequestOptions;
  let tokenId;

  const messages: { value: Event; done: boolean }[] = [];

  let resolve;
  const pushMessage = (p) => {
    messages.push(p);

    if (resolve) {
      resolve();
      resolve = null;
    }
  };

  async function createToken() {
    const token = uuidv7();
    debug('create token', token);
    return await client
      .request<CreateTokenResponse>(
        {
          method: 'POST',
          path: '/channels/in_app/tokens',
          data: { in_app: { token } },
        },
        _options,
      )
      .then((res) => {
        debug('token created', res);
        return res.in_app.token;
      });
  }

  async function deleteToken(token: string) {
    debug('delete token', token);
    void client
      .request(
        {
          method: 'DELETE',
          path: `/channels/in_app/tokens/${token}`,
        },
        _options,
      )
      .then((res) => {
        debug('token deleted', res);
      })
      .catch((err) => {
        // just log a debug message, magicbell backend will expire it
        debug('failed to delete token', err.message);
      });
  }

  let reconnectIntervalId;

  function startReconnectInterval() {
    debug('scheduling reconnect');
    reconnectIntervalId = setInterval(() => {
      debug('reconnecting...');
      connect();
    }, 5_000);
  }

  let pingIntervalId;

  function startPingInterval() {
    const sendPing = () => {
      if (socket.readyState !== WebSocket.OPEN) return;
      debug('send ping');
      socket.send('PING');
    };

    pingIntervalId = setInterval(sendPing, 30_000);
    sendPing();
  }

  async function connect() {
    if (socket?.readyState === WebSocket.OPEN || socket?.readyState === WebSocket.CONNECTING) {
      debug('ignore connect request, already open or connecting');
      return;
    }

    if (!tokenId) {
      tokenId = await createToken();
    }

    // new connection, flush all messages, so we don't auto close this immediately
    // because of stuck { done: true } messages in React.StrictMode
    messages.length = 0;

    const clientOptions = client._getOptions();
    const wssUrl = args?.socketHost ? new URL(args.socketHost) : client._getUrl('/production');
    wssUrl.protocol = wssUrl.protocol.replace('http', 'ws');
    wssUrl.searchParams.set('token', tokenId);
    wssUrl.searchParams.set('api_key', clientOptions.apiKey);

    debug(`connecting to`, wssUrl.toString());
    socket = new WebSocket(wssUrl.toString(), []);

    socket.onopen = function onOpen() {
      info('connected');
      clearInterval(reconnectIntervalId);
      startPingInterval();
    };

    socket.onmessage = function onMessage(event: MessageEvent<Event>) {
      info('received message', event.data);
      const message = parseMessageData(event.data);

      if (!message) return;

      if (message.type === 'close') {
        return pushMessage({ value: null, done: true });
      }

      pushMessage({ value: message, done: false });
    };

    let requestClose = false;
    socket.onclose = function onClose(event: CloseEvent) {
      clearInterval(pingIntervalId);

      if (event.wasClean || requestClose) {
        info('connection closed', event.code, event.reason);
        pushMessage({ value: null, done: true });
        void deleteToken(tokenId);
        tokenId = null;
        return;
      }

      debug('connection closed unexpectedly');
      startReconnectInterval();
    };

    const fatalErrors = new Set([401]);
    socket.onerror = function onError(e) {
      const code = Number(e.message.match(/\d{3}/)?.[0]);
      debug('socket error: ', code, e.message);
      if (fatalErrors.has(code)) {
        requestClose = true;
      }
    };
  }

  function listen(options?: RequestOptions): IterableEventSource<Event> {
    _options = options;
    void connect();

    const asyncIteratorNext = async () => {
      let event: (typeof messages)[number] | null = null;

      // It's weird that `event` can be undefined? We don't push empty messages
      // This happens when running in <React.StrictMode />. I guess there are
      // two instances resolving the promise above, the second resolve results
      // in no content. See this github pr for more context:
      // https://github.com/magicbell/magicbell-js/pull/189
      while (!event) {
        if (!messages.length) await new Promise((r) => (resolve = r));
        event = messages.pop();
      }

      if (!event) return { done: false, value: '' };
      if (event.done && (socket?.readyState === WebSocket.CONNECTING || socket?.readyState === WebSocket.OPEN)) {
        info('done');
        socket.close();
      }

      return event;
    };

    const dispose = () => {
      debug('dispose');
      socket?.close();
      // push to resolve async iterators, return for sync ones
      pushMessage({ done: true, value: undefined });
      return { done: true, value: undefined };
    };

    const forEach = makeForEach(asyncIteratorNext, dispose);
    const autoPaginationMethods = {
      forEach,
      close: () => void dispose(),

      next: asyncIteratorNext,
      return: dispose,
      [ASYNC_ITERATOR_SYMBOL]: () => {
        return autoPaginationMethods;
      },
    };

    return autoPaginationMethods;
  }

  return listen;
}
