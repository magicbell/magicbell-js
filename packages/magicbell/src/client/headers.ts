import { deleteEmptyHeaders } from 'fetch-addons';
import type { Hooks } from 'ky';

import { ClientOptions } from './types.js';

function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
  request.headers.set('content-type', 'application/json');
  request.headers.set('accept', 'application/json');
  request.headers.set('idempotency-key', idempotencyKey);

  // this is the only endpoint that will ever work with the accept-version: v2 header
  if (new URL(request.url).pathname === '/notification_preferences') {
    request.headers.set('accept-version', 'v2');
  }

  // user provided headers
  for (const [key, value] of Object.entries(options.headers || {})) {
    request.headers.set(key, value);
  }

  // can't set user-agent in the browser, see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
  request.headers.set('user-agent', typeof document !== 'undefined' ? '' : getUserAgent(options.appInfo));

  // magicbell headers
  request.headers.set('x-magicbell-client-user-agent', getClientUserAgent(options.appInfo));

  if (options.token) {
    request.headers.set('authorization', `Bearer ${options.token}`);
    deleteEmptyHeaders(request.headers);
    return;
  }

  request.headers.set('x-magicbell-api-key', options.apiKey);

  if (options.apiSecret) {
    request.headers.set('x-magicbell-api-secret', options.apiSecret);
  } else if (options.userExternalId) {
    request.headers.set('x-magicbell-user-hmac', options.userHmac);
    request.headers.set('x-magicbell-user-external-id', options.userExternalId);
  } else if (options.userEmail) {
    request.headers.set('x-magicbell-user-hmac', options.userHmac);
    request.headers.set('x-magicbell-user-email', options.userEmail);
  }

  // remove empty headers, they can cause unexpected behavior
  deleteEmptyHeaders(request.headers);
}

export function withRequestHeaders(options: ClientOptions): Hooks {
  return {
    beforeRequest: [(request) => setRequestHeaders(options, request)],
  };
}

function getEnvInfo() {
  if (typeof process === 'undefined') {
    return { binding: 'magicbell' };
  }

  return {
    binding: 'magicbell',
    runtime: process?.release?.name || 'node',
    runtime_version: process.version,
    platform: process.platform,
    arch: process.arch,
  };
}

function getAppInfoAsString(appInfo?: ClientOptions['appInfo']) {
  if (!appInfo?.name) return '';

  return [appInfo?.name, appInfo.version && `/${appInfo.version}`, appInfo.url && ` (${appInfo.url})`]
    .filter(Boolean)
    .join('');
}

function getUserAgent(appInfo?: ClientOptions['appInfo']) {
  const env = getEnvInfo();

  return [`${env.binding}`, 'runtime' in env && `${env.runtime}/${env.runtime_version}`, getAppInfoAsString(appInfo)]
    .filter(Boolean)
    .join(' ');
}

function getClientUserAgent(appInfo?: ClientOptions['appInfo']) {
  return JSON.stringify({ ...getEnvInfo(), application: appInfo });
}
