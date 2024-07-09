import { uuidv7 } from 'uuidv7';

import { Client } from '../client/client';
import { debug, info } from '../client/log';
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

type IterableSocket<TNode> = {
  [Symbol.asyncIterator](): Iterator<TNode>;
  forEach(cb: (node: TNode, index: number) => void | boolean | Promise<void | boolean>): Promise<void>;
  close(): void;
};

const nonRecoverableErrors = new Set([
  4001, // Authentication token missing
  4002, // Invalid authentication token
  4003, // Forbidden: User is not allowed to connect
  4004, // Unsupported data type
  4006, // Too many connection attempts
  4007, // Rate limit exceeded
  4009, // Internal server error
]);

export type Listener = (options?: RequestOptions) => IterableSocket<Event>;

function parseMessageData(data) {
  try {
    const json = JSON.parse(data);
    if (!isObject(json) || isArray(json)) {
      debug('skip message', { data });
      return null;
    }

    // ably sends messages like { id: string, ..., encoding: 'json', data: string }
    if (json.encoding === 'json' && typeof json.data === 'string') {
      json.data = JSON.parse(json.data);
    }

    return json;
  } catch {
    debug('non-json message', data);
    // assume it's a message type like PING, PONG, CLOSE.
    return { type: data };
  }
}

function createInterval(callback: () => void, options: { ms: number; leading?: boolean }) {
  let id;

  function stop() {
    clearInterval(id);
  }

  function start() {
    stop();
    id = setInterval(callback, options.ms);

    if (options.leading) {
      callback();
    }
  }

  return {
    start,
    stop,
  };
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
    // TODO: get wss endpoint from response
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

  // TODO; improve reconnect logic
  const reconnectInterval = createInterval(
    () => {
      debug('reconnecting...');
      connect();
    },
    { ms: 5_000 },
  );

  const pingInterval = createInterval(
    () => {
      if (socket.readyState !== WebSocket.OPEN) return;
      debug('send ping');
      // TODO: enable pings
      // socket.send(JSON.stringify({ type: 'ping' }));
    },
    { ms: 20_000, leading: true },
  );

  async function connect() {
    debug('ready state', socket?.readyState);

    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
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
    // TODO: fix this path name
    const wssUrl = args?.socketHost ? new URL(args.socketHost) : new URL('wss://ws-4776.magicbell.cloud'); // client._getUrl('/production');
    wssUrl.protocol = wssUrl.protocol.replace('http', 'ws');
    wssUrl.searchParams.set('token', tokenId);
    wssUrl.searchParams.set('api_key', clientOptions.apiKey);

    debug(`connecting to`, wssUrl.toString());
    socket = new WebSocket(wssUrl.toString(), []);

    socket.onopen = function onOpen() {
      info('connected');
      reconnectInterval.stop();
      pingInterval.start();
    };

    socket.onmessage = function onMessage(event: MessageEvent<Event>) {
      info('received message', event.data);
      const message = parseMessageData(event.data);

      if (!message?.data) return;

      if (message.type === 'CLOSE') {
        return pushMessage({ value: null, done: true });
      }

      pushMessage({ value: message, done: false });
    };

    let requestClose = false;
    socket.onclose = function onClose(event: CloseEvent) {
      pingInterval.stop();

      const isFatal = nonRecoverableErrors.has(event.code);
      if (event.wasClean || requestClose || isFatal) {
        info('connection closed', { code: event.code, reason: event.reason });
        pushMessage({ value: null, done: true });
        void deleteToken(tokenId);
        tokenId = null;
        return;
      }

      debug('connection closed unexpectedly', { code: event.code, reason: event.reason });
      reconnectInterval.start();
    };

    socket.onerror = function onError(e) {
      if (!('message' in e) || typeof e.message !== 'string') {
        debug('unknown socket error', e);
        return;
      }

      const code = Number(e.message.match(/\d{3}/)?.[0]);
      debug('socket error: ', code, e.message);
      if (nonRecoverableErrors.has(code)) {
        requestClose = true;
      }
    };
  }

  function listen(options?: RequestOptions): IterableSocket<Event> {
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
