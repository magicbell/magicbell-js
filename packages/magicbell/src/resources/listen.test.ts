import { messageStream, mockHandlers, setupMockServer } from '@magicbell/utils';

import { Client } from '../client/client';
import { createListener } from './listen';

const server = setupMockServer(...mockHandlers);
let listen;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

beforeEach(async () => {
  server.intercept('post', '/channels/in_app/tokens', { in_app: { token: 'token' } });
  server.intercept('delete', '/channels/in_app/tokens/token', { in_app: { token: 'token' } });

  const socket = await messageStream(function* () {
    yield { type: 'notifications/new', data: { id: 1 } };
    yield { type: 'notifications/new', data: { id: 2 } };
    yield { type: 'notifications/new', data: { id: 3 } };
  });

  const client = new Client({ apiKey: 'my-api-key' });
  listen = createListener(client, { socketHost: socket.host });
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
  }, 100);

  for await (const event of iterator) {
    events.push(event);
    await sleep(1000);
  }

  expect(events).toHaveLength(1);
});
