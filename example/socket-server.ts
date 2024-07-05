import debug from 'debug';
import WebSocket from 'ws';

const log = {
  send: debug('socket-server:send'),
  received: debug('socket-server:received'),
  info: debug('socket-server:info'),
  error: debug('socket-server:error'),
};

const server = new WebSocket.Server({ port: 8080 });

function randomEvent() {
  return {
    id: Math.random().toString(36).substr(2),
    name: 'notifications/read',
    timestamp: Date.now(),
    encoding: 'none',
    channel: 'none',
    data: { id: Math.random().toString(16).slice(2), client_id: 'client-abc' },
  };
}

function ablyEvent() {
  return {
    id: 'NkGsuDBSrK:0:0',
    timestamp: 1720166521401,
    name: 'notifications/new',
    channel: 'project:1303:channel:1ae28790-3440-413c-a800-c8e89804ea74',
    data: '{"id":"019081ea-1178-7101-98e3-d175bd2acbae"}',
    encoding: 'json',
  };
}

server.on('connection', (socket, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get('token');
  const apiKey = url.searchParams.get('api_key');

  log.info('connected', { token, apiKey });

  if (!apiKey || !token) {
    log.info('close, auth token missing');
    socket.close(4001, 'Authentication token missing');
    return;
  }

  if (!/^[a-fA-F0-9]{40}$/.test(apiKey)) {
    log.info('close, api key invalid');
    socket.close(4002, 'API key invalid');
    return;
  }

  log.info('authenticated', token);

  socket.on('message', (event) => {
    const message = event.toString();
    log.received(message);

    if (message === 'PING') {
      log.send('PONG');
      socket.send('PONG');
      return;
    }
  });

  setInterval(() => {
    const msg = JSON.stringify(randomEvent());
    log.send(msg);
    socket.send(msg);
  }, 3_000);

  setInterval(() => {
    const msg = JSON.stringify(ablyEvent());
    log.send(msg);
    socket.send(msg);
  }, 5_000);

  socket.on('close', () => {
    log.info('client disconnected');
  });
});

log.info('WebSocket server is running on ws://localhost:8080');
