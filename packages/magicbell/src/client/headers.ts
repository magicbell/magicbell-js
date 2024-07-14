import { deleteEmptyHeaders } from 'fetch-addons';
import type { Hooks } from 'ky';
import { uuidv7 } from 'uuidv7';

import { ClientOptions } from './types';

function getDefaultIdempotencyKey(method: string, maxRetries: number) {
  if (method.toUpperCase() !== 'POST' || maxRetries === 0) return;
  return `magicbell-retry-${uuidv7()}`;
}

export function getAuthHeaders(options: Partial<ClientOptions>) {
  if (options.token) {
    return { authorization: `Bearer ${options.token}` };
  }

  const headers: Record<string, string> = {
    'x-magicbell-api-key': options.apiKey,
  };

  if (options.apiSecret) {
    headers['x-magicbell-api-secret'] = options.apiSecret;
  } else if (options.userExternalId) {
    headers['x-magicbell-user-external-id'] = options.userExternalId;
  } else if (options.userEmail) {
    headers['x-magicbell-user-email'] = options.userEmail;
  }

  if (!options.apiSecret && options.userHmac) {
    headers['x-magicbell-user-hmac'] = options.userHmac;
  }

  return headers;
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
  if (typeof document === 'undefined') {
    request.headers.set('user-agent', getUserAgent(options.appInfo));
  }

  // magicbell headers
  request.headers.set('x-magicbell-client-user-agent', getClientUserAgent(options.appInfo));

  const authHeaders = getAuthHeaders(options);
  for (const [key, val] of Object.entries(authHeaders)) {
    request.headers.set(key, val);
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
  const common = {
    binding: __PACKAGE_NAME__,
    binding_version: __PACKAGE_VERSION__,
    publisher: 'magicbell',
  };

  if (typeof process === 'undefined') {
    return common;
  }

  return {
    ...common,
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

  return [
    `${env.binding}/${env.binding_version}`,
    'runtime' in env && `${env.runtime}/${env.runtime_version}`,
    getAppInfoAsString(appInfo),
  ]
    .filter(Boolean)
    .join(' ');
}

function getClientUserAgent(appInfo?: ClientOptions['appInfo']) {
  return JSON.stringify({ ...getEnvInfo(), application: appInfo });
}
