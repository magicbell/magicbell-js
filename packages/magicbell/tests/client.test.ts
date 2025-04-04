import { setTimeout } from 'node:timers/promises';

import { mockHandlers, setupMockServer } from '@magicbell/utils';

import { Client as Client } from '../src/client/client.js';

const server = setupMockServer(...mockHandlers);

test('initialization throws an error if required props are not provided', () => {
  expect(() => new Client({} as any)).toThrow(
    'You have not provided any of the required client options. Please provide token or apiKey.',
  );
});

test('initialization validates known options', () => {
  expect(() => new Client({ apiKey: 4 } as any)).toThrow(
    'You have provided invalid client options. Please check the options apiKey.',
  );
});

test('requests are made against the configured host', async () => {
  const client = new Client({
    host: 'https://example.com',
    apiKey: 'my-api-key',
  });

  let reqUrl: string;
  server.intercept('all', ({ request }) => {
    reqUrl = request.url;
  });

  await client.request({
    method: 'GET',
    path: '/me',
  });

  expect(reqUrl).toEqual('https://example.com/me');
});

test('requests are retried in case of recoverable errors', async () => {
  const status = server.intercept('all', () => {
    if (status.handledRequests < 2) return { status: 503 };
    return { id: 1 };
  });

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    cacheTTL: 0,
  });

  await expect(
    client.request({
      method: 'GET',
      path: '/me',
    }),
  ).resolves.toEqual({ id: 1 });

  expect(status.handledRequests).toEqual(3);
});

test('retried requests get an idempotency-key header', async () => {
  let idempotencyKeys = [];
  server.intercept('all', ({ request }) => {
    idempotencyKeys.push(request.headers.get('idempotency-key'));
    if (idempotencyKeys.length < 2) return { status: 503 };
    return { id: 1 };
  });

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    maxRetries: 3,
    cacheTTL: 0,
  });

  // verify that this request is done using 3 identical idempotencyKeys
  await client.request({ method: 'POST', path: '/me' });

  expect(idempotencyKeys).toHaveLength(2);
  expect(idempotencyKeys[0]).toBeTruthy();
  expect(idempotencyKeys[1]).toEqual(idempotencyKeys[0]);

  const firstKey = idempotencyKeys[0];
  idempotencyKeys = [];

  // verify that a new request is done using a different idempotencyKey
  await client.request({ method: 'POST', path: '/me' });

  expect(idempotencyKeys).toHaveLength(2);
  expect(idempotencyKeys[0]).toBeTruthy();
  expect(idempotencyKeys[1]).toEqual(idempotencyKeys[0]);
  expect(idempotencyKeys[1]).not.toEqual(firstKey);
});

test('requests are not retried in case of unrecoverable errors', async () => {
  const status = server.intercept('all', () => {
    if (status.handledRequests < 2) return { status: 404 };
    return { id: 1 };
  });

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    cacheTTL: 0,
  });

  await expect(
    client.request({
      method: 'GET',
      path: '/me',
    }),
  ).rejects.toThrow('Request failed with status code 404');

  expect(status.handledRequests).toEqual(1);
});

test('client accepts custom headers', async () => {
  const status = server.intercept('all', () => ({ id: 1 }));

  const client = new Client({
    host: 'https://example.com',
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    headers: {
      'X-Custom-Header': 'foo',
      host: 'api.magicbell.com',
    },
    cacheTTL: 0,
  });

  // verify that this request is done using 3 identical idempotencyKeys
  await client.request({ method: 'POST', path: '/me' });
  expect(status.lastRequest.url.toString()).toEqual('https://example.com/me');
  expect(status.lastRequest.headers.get('x-custom-header')).toEqual('foo');
  expect(status.lastRequest.headers.get('host')).toEqual('api.magicbell.com');
});

test("custom headers don't override controlled ones", async () => {
  const status = server.intercept('all', () => ({ id: 1 }));

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    headers: {
      'x-magicbell-api-key': 'bar',
    },
    cacheTTL: 0,
  });

  // verify that this request is done using 3 identical idempotencyKeys
  await client.request({ method: 'POST', path: '/me' });
  expect(status.lastRequest.headers.get('x-magicbell-api-key')).toEqual('my-api-key');
});

test('custom headers can be provided per request basis', async () => {
  const status = server.intercept('all', () => ({ id: 1 }));

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    headers: {
      'x-custom-header-one': 'one',
    },
    cacheTTL: 0,
  });

  await client.request({
    method: 'POST',
    path: '/me',
    headers: {
      'x-custom-header-two': 'two',
    },
  });

  expect(status.lastRequest.headers.get('x-custom-header-one')).toEqual('one');
  expect(status.lastRequest.headers.get('x-custom-header-two')).toEqual('two');
});

test('requests within the same ttl are deduped', async () => {
  const status = server.intercept('all', () => ({ id: Math.random() }));

  const client = new Client({
    apiKey: 'my-api-key',
    maxRetryDelay: 0,
    cacheTTL: 1_000,
  });

  const res1 = await client.request({ method: 'GET', path: '/me' });
  const res2 = await client.request({ method: 'GET', path: '/me' });
  expect(res1).toEqual(res2);
  expect(status.handledRequests).toEqual(1);

  await setTimeout(1100);

  // a new call after the 1sec ttl should result in a new promise
  const res3 = await client.request({ method: 'GET', path: '/me' });
  expect(res3).not.toEqual(res1);
  expect(status.handledRequests).toEqual(2);

  // a call in the same time, but using another endpoint results in a new promise
  const res4 = await client.request({ method: 'GET', path: '/them' });
  expect(res4).not.toEqual(res3);
  expect(status.handledRequests).toEqual(3);
});
