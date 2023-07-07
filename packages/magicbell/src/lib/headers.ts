import { deleteEmptyHeaders } from 'fetch-addons';
import type { Hooks } from 'ky';

import { ClientOptions } from '../types';
import { getClientUserAgent, getUserAgent } from './env';
import { uuid4 } from './utils';

function getDefaultIdempotencyKey(method: string, maxRetries: number) {
  if (method.toUpperCase() !== 'POST' || maxRetries === 0) return;
  return `magicbell-retry-${uuid4()}`;
}

function setRequestHeaders(options: ClientOptions, request: Request) {
  const idempotencyKey =
    request.headers.get('idempotency-key') ||
    options.idempotencyKey ||
    getDefaultIdempotencyKey(request.method, options.maxRetries);

  // default headers
  request.headers.set('accept-version', 'v2');
  request.headers.set('content-type', 'application/json');
  request.headers.set('accept', 'application/json');
  request.headers.set('idempotency-key', idempotencyKey);

  // user provided headers
  for (const [key, value] of Object.entries(options.headers || {})) {
    request.headers.set(key, value);
  }

  // can't set user-agent in the browser, see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
  request.headers.set('user-agent', typeof document !== 'undefined' ? '' : getUserAgent(options.appInfo));

  // magicbell headers
  request.headers.set('x-magicbell-api-key', options.apiKey);
  request.headers.set('x-magicbell-api-secret', options.apiSecret);
  request.headers.set('x-magicbell-client-user-agent', getClientUserAgent(options.appInfo));
  request.headers.set('x-magicbell-user-email', options.userEmail);
  request.headers.set('x-magicbell-user-external-id', options.userExternalId);
  request.headers.set('x-magicbell-user-hmac', options.userHmac);

  // remove empty headers, they can cause unexpected behavior
  deleteEmptyHeaders(request.headers);
}

export function withRequestHeaders(options: ClientOptions): Hooks {
  return {
    beforeRequest: [(request) => setRequestHeaders(options, request)],
  };
}
