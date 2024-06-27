import ky from 'ky';

import { Client } from '../client/client';
import { ASYNC_ITERATOR_SYMBOL, makeForEach } from '../client/paginate';
import { RequestOptions } from '../client/types';

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
  close(): void;
};

export type Listener = (options?: RequestOptions) => IterableEventSource<Event>;

export function createListener(client: InstanceType<typeof Client>, args: { sseHost?: string } = {}): Listener {
  let eventSource: EventSource;
  let channels: string;
  let lastEvent: string;
  let configPromise;

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

  // accept callback or yield
  async function connect(options?: RequestOptions) {
    activeCount++;

    // invoke optional config request in the background, as we only need it after the ably authentication
    if (!channels && !configPromise) {
      configPromise = client
        .request({ method: 'GET', path: '/config' }, options)
        .then((x) => (channels = x.ws.channel));
    }

    const auth = await client.request<AuthResponse>({ method: 'POST', path: '/ws/auth' }, options);

    // authenticate against ably
    const { token } = await ky(`https://rest.ably.io/keys/${auth.keyName}/requestToken`, {
      method: 'POST',
      json: auth,
    }).then((x) => x.json<TokenResponse>());

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

    // dispose could've been called while we were waiting for the config request to finish
    if (activeCount < 1) return;

    // new eventsource, flush all messages so we don't auto close this immediately
    // because of stuck { done: true } messages in React.StrictMode
    messages.length = 0;
    eventSource = new EventSource(url.toString());

    // handle incoming messages
    eventSource.addEventListener('message', (event) => {
      // event.origin can be undefined in react-native (devmode?)
      if (event.origin && event.origin !== sseHost) return;

      lastEvent = event.lastEventId;
      if (!('data' in event)) return;

      const message = JSON.parse(event.data);
      if (message.type === 'close') {
        return pushMessage({ value: null, done: true });
      }

      message.data = message.encoding === 'json' ? JSON.parse(message.data) : message.data;
      pushMessage({ value: message, done: false });
    });

    // handle close
    eventSource.addEventListener('close', () => {
      return pushMessage({ value: null, done: true });
    });

    // handle connection errors
    eventSource.addEventListener('error', (msg) => {
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
        console.log('sse error:', msg);
      }
    });
  }

  function listen(options?: RequestOptions): IterableEventSource<Event> {
    void connect(options);

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
      if (event.done && eventSource) eventSource.close();
      return event;
    };

    const dispose = () => {
      activeCount--;
      eventSource?.close();
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
