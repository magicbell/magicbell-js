import { Server, WebSocket as MockWebSocket } from 'mock-socket';
import portfinder from 'portfinder';
import { afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest';

import type { createListener as CreateListener, Listener } from '../src/resources/listen.js';

let listen: Listener;
let createListener: typeof CreateListener;
let wsServer: Server;
let socketURL = 'ws://localhost:12345';
let originalWebSocket: typeof WebSocket | undefined;

class PatchedWebSocket extends MockWebSocket {
  addEventListener(type: string, listener: (event: any) => void) {
    if (type === 'message') {
      return super.addEventListener(type, (event: any) => {
        if (event?.origin) {
          event.origin = new URL(event.origin).origin;
        }

        listener(event);
      });
    }

    return super.addEventListener(type, listener);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

vi.mock('../src/lib/signal-polyfill.js', () => ({}));

beforeAll(async () => {
  ({ createListener } = await import('../src/resources/listen.js'));
});

beforeEach(async () => {
  (globalThis as any).window = {};
  (globalThis as any).document = {};
  originalWebSocket = (globalThis as any).WebSocket;
  (globalThis as any).WebSocket = PatchedWebSocket;
  const port = await portfinder.getPortPromise();
  socketURL = `ws://localhost:${port}`;

  wsServer = new Server(new URL(socketURL).toString(), { mock: false });
  wsServer.on('connection', (socket) => {
    const baseEvent = {
      encoding: 'json',
      channel: 'notifications',
      timestamp: Date.now(),
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    const sendEvent = (id: number, delay: number) => {
      const timer = setTimeout(() => {
        socket.send(
          JSON.stringify({
            ...baseEvent,
            id: `evt-${id}`,
            name: 'notifications/new',
            data: { id },
          }),
        );
      }, delay);
      timers.push(timer);
    };

    sendEvent(1, 0);
    sendEvent(2, 10);
    sendEvent(3, 20);

    const closeTimer = setTimeout(() => {
      socket.send(JSON.stringify({ type: 'close' }));
      socket.close();
    }, 50);
    timers.push(closeTimer);

    socket.addEventListener('close', () => {
      timers.forEach((timer) => clearTimeout(timer));
    });
  });

  const client = {
    request: vi.fn().mockResolvedValue({ 'in_app/inbox': { token: 'token' } }),
  } as any;
  listen = createListener(client, { apiKey: 'my-api-key', socketURL });
});

afterEach(() => {
  wsServer?.stop();
  if (originalWebSocket) {
    (globalThis as any).WebSocket = originalWebSocket;
  } else {
    delete (globalThis as any).WebSocket;
  }
  delete (globalThis as any).window;
  delete (globalThis as any).document;
});

test('can listen to realtime events using async iterator', async () => {
  const events: any[] = [];
  for await (const event of listen()) {
    events.push(event);
  }

  expect(events).toHaveLength(3);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
  expect(events[2].data).toEqual({ id: 3 });
});

test('can listen to realtime events using forEach helper', async () => {
  const events: any[] = [];
  await listen().forEach((event) => {
    events.push(event);
  });

  expect(events).toHaveLength(3);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
  expect(events[2].data).toEqual({ id: 3 });
});

test('break from iteration closes listener', async () => {
  const events: any[] = [];
  for await (const event of listen()) {
    events.push(event);
    if (events.length === 2) break;
  }

  expect(events).toHaveLength(2);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
});

test('return false in forEach helper closes listener', async () => {
  const events: any[] = [];
  await listen().forEach((event, idx) => {
    events.push(event);
    return idx < 1;
  });

  expect(events).toHaveLength(2);
  expect(events[0].data).toEqual({ id: 1 });
  expect(events[1].data).toEqual({ id: 2 });
});

test('can close listener', async () => {
  const events: any[] = [];

  const iterator = listen();
  setTimeout(() => {
    iterator.close();
  }, 60);

  for await (const event of iterator) {
    events.push(event);
    await sleep(100);
  }

  expect(events).toHaveLength(1);
});
