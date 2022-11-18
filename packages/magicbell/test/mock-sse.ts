import http from 'http';
import portFinder from 'portfinder';

export function eventStream(generatorFn: () => Generator<Record<string, unknown>, void, unknown>) {
  let done = false;

  const server = http.createServer(function (req, res) {
    const url = new URL(req.url, 'http://localhost');

    if (url.pathname === '/sse') {
      const iterator = generatorFn();

      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      res.write('retry: 10000\n\n');

      let msg = 0;
      while (true) {
        const next = iterator.next();

        if (next.value) {
          setTimeout(() => {
            res.write('data: ' + JSON.stringify(next.value) + '\n\n');
          }, msg++ * 5);
        }

        if (next.done) {
          setTimeout(() => {
            res.write('data:' + JSON.stringify({ type: 'close' }) + '\n\n');
          }, msg++ * 5);

          break;
        }
      }

      setTimeout(() => (done = true), msg++ * 5);
    }
  });

  const interval = setInterval(() => {
    if (!done) return;
    clearInterval(interval);
    clearTimeout(timeout);
    server.close();
  }, 5);

  const timeout = setTimeout(() => clearInterval(interval), 30_000);

  return new Promise<{ host: string; port: number }>((resolve) => {
    portFinder.getPortPromise().then((port) => {
      server.listen(port);
      resolve({ port, host: `http://localhost:${port}` });
    });
  });
}
