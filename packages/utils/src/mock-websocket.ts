import Debug from 'debug';
import portFinder from 'portfinder';
import WebSocket from 'ws';

const debug = Debug('magicbell:mock-websocket');

const TIMEOUT = 30_000;
const DELAY = 30;

export async function messageStream(generatorFn: () => Generator<Record<string, unknown>, void, unknown>) {
  const done = false;

  const port = await portFinder.getPortPromise();
  const host = `ws://localhost:${port}`;
  const server = new WebSocket.Server({ port });
  debug('listening on', host);

  server.on('connection', (socket, req) => {
    debug('client connected');
    let msg = 0;

    const iterator = generatorFn();

    socket.on('close', () => {
      debug('client disconnected');
      setTimeout(cleanup(true), DELAY);
    });

    // Parse the token from the URL query string
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const apiKey = url.searchParams.get('api_key');

    if (!apiKey || !token) {
      debug('authentication token missing', { apiKey, token });
      socket.close(4001, 'Authentication token missing');
      return;
    }

    if (apiKey === 'invalid') {
      debug('api key invalid', { apiKey });
      socket.close(4002, 'API key invalid');
      return;
    }

    while (true) {
      const next = iterator.next();

      if (next.value) {
        setTimeout(() => {
          debug('send', next.value);
          socket.send(JSON.stringify(next.value));
        }, msg++ * DELAY);
      }

      if (next.done) {
        setTimeout(() => {
          debug('send CLOSE');
          socket.send('CLOSE');
        }, msg++ * DELAY);

        break;
      }
    }
  });

  const cleanup =
    (force = false) =>
    () => {
      if (!done && !force) return;
      clearInterval(interval);
      clearTimeout(timeout);
      debug('CLOSE', force);
      server.close();
    };

  const interval = setInterval(cleanup(false), DELAY);
  const timeout = setTimeout(cleanup(true), TIMEOUT);

  return { port, host };
}
