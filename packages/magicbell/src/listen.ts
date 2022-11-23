import axios from 'axios';
import EventSource from 'eventsource';

import { Client } from './client';
import { ASYNC_ITERATOR_SYMBOL, makeForEach } from './paginate';
import { RequestOptions } from './types';

type AuthResponse = {
  keyName: string;
  timestamp: number;
  nonce: string;
  ttl: number;
  mac: string;
};

type TokenResponse = {
  token: string;
  keyName: string;
  issued: number;
  expires: number;
  capability: string;
  userClaims: string;
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
};

export type Listener = (options?: RequestOptions) => IterableEventSource<Event>;

export function createListener(client: InstanceType<typeof Client>, args: { sseHost?: string } = {}): Listener {
  let eventSource: EventSource;
  let channels: string;
  let lastEvent: string;
  let configPromise;

  const messages: { value: Event; done: boolean }[] = [];
  let resolve;

  const pushMessage = (p) => {
    messages.push(p);

    if (resolve) {
      resolve();
      resolve = null;
    }
  };

  // accept callback or yield
  async function connect(options?: RequestOptions) {
    // invoke optional config request in the background, as we only need it after the ably authentication
    if (!channels && !configPromise) {
      configPromise = client
        .request({ method: 'GET', path: '/config' }, options)
        .then((x) => (channels = x.ws.channel));
    }

    const auth = await client.request<AuthResponse>({ method: 'POST', path: '/ws/auth' }, options);

    // authenticate against ably
    const { token } = await axios
      .post<TokenResponse>(`https://rest.ably.io/keys/${auth.keyName}/requestToken`, auth)
      .then((x) => x.data);

    // make sure that the optional config request has finished
    await configPromise;

    // establish a connection with that token, the only reason we allow passing in the sseHost via args,
    // is so that we have a way to reroute to localhost for testing.
    const sseHost = args.sseHost || 'https://realtime.ably.io';
    const url = new URL('sse', sseHost);

    url.searchParams.append('v', '1.1');
    url.searchParams.append('accessToken', token);
    url.searchParams.append('channels', channels);
    url.searchParams.append('heartbeats', 'true');

    if (lastEvent) {
      url.searchParams.append('lastEvent', lastEvent);
    }

    if (eventSource) {
      eventSource.close();
    }

    eventSource = new EventSource(url.toString());

    // handle incoming messages
    eventSource.onmessage = (event) => {
      if (event.origin !== sseHost) return;

      lastEvent = event.lastEventId;
      if (!('data' in event)) return;

      const message = JSON.parse(event.data);
      if (message.type === 'close') {
        return pushMessage({ value: null, done: true });
      }

      message.data = message.encoding === 'json' ? JSON.parse(message.data) : message.data;
      pushMessage({ value: message, done: false });
    };

    // handle connection errors
    eventSource.onerror = (msg) => {
      const err = 'data' in msg ? JSON.parse((msg as any).data) : {};
      const isTokenErr = err.code >= 40140 && err.code < 40150;
      if (isTokenErr) {
        eventSource.close();
        connect(options);
      } else if (/invalid channel id/i.test(err.message)) {
        eventSource.close();
        pushMessage({ value: null, done: true });
      } else {
        // eslint-disable-next-line no-console
        console.log('err', msg);
      }
    };
  }

  function listen(options?: RequestOptions): IterableEventSource<Event> {
    void connect(options);

    const asyncIteratorNext = async () => {
      if (!messages.length) await new Promise((r) => (resolve = r));
      const event = messages.pop();
      if (event.done && eventSource) eventSource.close();
      return event;
    };

    const dispose = () => {
      eventSource.close();
      return { done: true, value: undefined };
    };

    const forEach = makeForEach(asyncIteratorNext, dispose);
    const autoPaginationMethods = {
      forEach,

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
