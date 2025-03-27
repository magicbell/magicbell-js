import '../lib/signal-polyfill.js';

import ky from '@smeijer/ky';
import urlJoin from 'url-join';

import { tryParse } from '../lib/utils.js';
import { createError } from './error.js';
import { withRequestHeaders } from './headers.js';
import { withRequestLogging } from './log.js';
import { assertHasSomeOptions, assertHasValidOptions, mergeHooks } from './options.js';
import { withRequestTelemetry } from './telemetry.js';
import { ClientOptions, FeatureFlag, RequestArgs, RequestOptions } from './types.js';

export const DEFAULT_OPTIONS: Partial<ClientOptions> = {
  host: 'https://api.magicbell.com',
  timeout: 30_000,
  maxRetries: 3,
  maxRetryDelay: 60,
  telemetry: true,
};

export class Client {
  #options: ClientOptions;

  constructor(options: ClientOptions) {
    assertHasValidOptions(options);
    assertHasSomeOptions(options, ['token', 'apiKey']);

    this.#options = { ...DEFAULT_OPTIONS, ...options };
  }

  hasFlag(flag: FeatureFlag) {
    return this.#options.features?.[flag] || false;
  }

  async request<TResponse = any>(
    { method, path, data, params, headers: reqHeaders }: RequestArgs,
    options?: RequestOptions,
  ) {
    const requestOptions: ClientOptions & RequestOptions = {
      ...this.#options,
      ...options,
      headers: { ...this.#options.headers, ...reqHeaders },
    };

    // don't just use `new URL(path, host)` as that will strip the path from the host
    const url = new URL(urlJoin(requestOptions.host, path));

    for (const [key, value] of Object.entries(params || {})) {
      url.searchParams.append(key, Array.isArray(value) ? value.join(',') : value);
    }

    const hooks = mergeHooks(
      withRequestHeaders(requestOptions),
      withRequestTelemetry(requestOptions),
      withRequestLogging(),
      this.#options.hooks,
    );

    return ky(url, {
      method,
      body: data && JSON.stringify(data),
      retry: {
        limit: requestOptions.maxRetries,
        // all methods, as post get idempotency keys
        methods: ['get', 'post', 'put', 'head', 'delete', 'options', 'trace'],
      },
      timeout: requestOptions.timeout,
      hooks,
    })
      .then((response) =>
        response
          .text()
          // handle cases where the response is empty
          .then((text) => JSON.parse(text) as TResponse)
          .catch(() => undefined as TResponse),
      )
      .catch(async (error) => {
        const body = tryParse(await error?.response?.text());

        throw createError({
          code: error.code,
          name: error.name,
          message: error.message,
          type: error['type'],
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          responseBody: body,
          ...body?.errors?.[0],
          stack: error.stack,
        });
      });
  }
}
