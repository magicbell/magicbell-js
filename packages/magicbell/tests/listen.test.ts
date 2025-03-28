import { eventStream, mockHandlers, setupMockServer } from '@magicbell/utils';

import { Client } from '../src/client/client.js';
import { createListener, Listener } from '../src/resources/listen.js';

const server = setupMockServer(...mockHandlers);
let listen: Listener;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

beforeEach(async () => {
  server.intercept('all', ({ request }) => {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/config') return { ws: { channel: 'project:1:channel:2' } };
    if (pathname === '/ws/auth') return { keyName: 'key', mac: 'random' };
    if (pathname === '/keys/key/requestToken') return { token: 'token' };
    if (pathname === '/sse') return { passThrough: true };
  });

  server.use(
    eventStream('https://realtime.ably.io/sse', function* () {
      yield { type: 'notifications/new', data: { id: 1 } };
      yield { type: 'notifications/new', data: { id: 2 } };
      yield { type: 'notifications/new', data: { id: 3 } };
    }),
  );

  const client = new Client({ apiKey: 'my-api-key', cacheTTL: 0 });
  listen = createListener(client);
});

test('can listen to realtime events using async iterator', async () => {
  const events = [];
  for await (const event of listen()) {
    events.push(event);
  }

  expect(events).toHaveLength(3);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
  expect(events[2].data).toEqual({ id: 3 });
});

test('can listen to realtime events using forEach helper', async () => {
  const events = [];
  await listen().forEach((event) => {
    events.push(event);
  });

  expect(events).toHaveLength(3);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
  expect(events[2].data).toEqual({ id: 3 });
});

test('break from iteration closes listener', async () => {
  const events = [];
  for await (const event of listen()) {
    events.push(event);
    if (events.length === 2) break;
  }

  expect(events).toHaveLength(2);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
});

test('return false in forEach helper closes listener', async () => {
  const events = [];
  await listen().forEach((event, idx) => {
    events.push(event);
    return idx < 1;
  });

  expect(events).toHaveLength(2);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
});

test('can close listener', async () => {
  const events = [];

  const iterator = listen();
  setTimeout(() => {
    iterator.close();
  }, 60);

  for await (const event of iterator) {
    events.push(event);
    await sleep(200);
  }

  expect(events).toHaveLength(1);
});
