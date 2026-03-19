import '../lib/signal-polyfill.js';

import WebSocket from 'reconnecting-websocket';

import { Client } from '../client/client.js';
import * as log from '../client/log.js';
import { ASYNC_ITERATOR_SYMBOL, makeForEach } from '../client/paginate.js';
import { RequestOptions } from '../client/types.js';
import { generateID } from '../lib/crypto';

type TokenResponse = {
  'in_app/inbox': {
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

function getWebSocket(): typeof WebSocket {
  if (typeof WebSocket === 'function') return WebSocket;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - wrong typings - https://github.com/pladaria/reconnecting-websocket/issues/196
  if ('default' in WebSocket && typeof WebSocket.default === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return WebSocket.default;
  }

  throw Error('WebSocket is not defined');
}

type ListenerOptions = {
  apiKey: string;
  socketURL?: string;
};

export function getSessionId() {
  if (typeof sessionStorage === 'undefined') {
    return generateID(64);
  }

  // sessionStorage gets cleared when the page session ends. A page
  // session lasts for as long as the browser is open and survives
  // over page reloads and restores. Opening a page in a new tab or
  // window will cause a new session to be initiated. This gives us
  // a stable ID per tab, and different ID's across tabs.
  const stored = sessionStorage.getItem('magicbell--realtime-token');
  if (stored) return stored;

  const id = generateID(64);
  sessionStorage.setItem('magicbell--realtime-token', id);
  return id;
}

export function createListener(client: InstanceType<typeof Client>, options: ListenerOptions): Listener {
  let socket: WebSocket | null = null;
  let origin: string | null = null;
  const socketURL = options.socketURL || 'wss://ws.magicbell.com';

  const messages: { value: Event; done: boolean }[] = [];
  let resolve;
  let activeCount = 0;

  const pushMessage = (p) => {
    messages.push(p);

    if (resolve) {
      resolve();
      resolve = null;
    }
  };

  async function getToken(requestOptions: RequestOptions) {
    const data = { inbox: { token: getSessionId() } };
    const res = await client.request<TokenResponse>(
      { method: 'POST', path: '/channels/in_app/inbox/tokens', data },
      requestOptions,
    );

    return res['in_app/inbox'].token;
  }

  async function getUrl(requestOptions: RequestOptions) {
    const token = await getToken(requestOptions);
    const url = new URL(socketURL);
    url.searchParams.set('api_key', options.apiKey);
    url.searchParams.set('token', token);
    origin = url.origin;
    return url.toString();
  }

  // accept callback or yield
  async function connect(requestOptions?: RequestOptions) {
    if (activeCount < 1) return;

    const WS = getWebSocket();
    if (socket && socket.readyState !== WS.CLOSED) {
      return;
    }

    // new connection, flush all messages so we don't auto close this immediately
    // because of stuck { done: true } messages in React.StrictMode
    messages.length = 0;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket = new WS(() => getUrl(requestOptions));

    socket.addEventListener('open', () => {
      log.info('socket: open');
    });

    socket.addEventListener('message', (event) => {
      if (event.origin !== origin) return;
      if (!('data' in event)) return;

      // todo: handle 'error'
      if (event.type !== 'message') return;

      try {
        const data = JSON.parse(event.data);
        if (data.type === 'close') {
          return pushMessage({ value: null, done: true });
        }

        log.debug('socket: received message', data);
        pushMessage({ value: data, done: false });
      } catch (e) {
        log.error('socket: failed to parse message', {
          data: event.data,
          error: e,
        });
      }
    });

    socket.addEventListener('close', () => {
      log.info('socket: close');
      return pushMessage({ value: null, done: true });
    });

    socket.addEventListener('error', (err) => {
      err.type;
    });

    // handle connection errors
    socket.addEventListener('error', (event) => {
      log.error('socket: error', event);

      const err = 'data' in event ? JSON.parse((event as any).data) : {};
      const isTokenErr = err.code >= 40140 && err.code < 40150;

      if (isTokenErr) {
        socket.close();
        connect(requestOptions);
      } else if (/invalid channel id/i.test(err.message)) {
        socket.close();
        pushMessage({ value: null, done: true });
      } else {
        console.error('socket: error', err);
      }
    });
  }

  function listen(options?: RequestOptions): IterableEventSource<Event> {
    activeCount++;
    void connect(options);

    const asyncIteratorNext = async () => {
      let event: (typeof messages)[number] | null = null;

      while (!event) {
        if (!messages.length) await new Promise((r) => (resolve = r));
        event = messages.pop();
      }

      // It's weird that `event` can be undefined? We don't push empty messages
      // This happens when running in <React.StrictMode />. I guess there are
      // two instances resolving the promise above, the second resolve results
      // in no content. See this github pr for more context:
      // https://github.com/magicbell/magicbell-js/pull/189
      if (!event) return { done: false, value: '' };
      if (event.done && socket) socket.close();
      return event;
    };

    const dispose = () => {
      activeCount--;
      if (activeCount < 1) {
        socket?.close();
        socket = null;
      }
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
