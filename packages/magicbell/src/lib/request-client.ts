import ky from 'ky';

import { isOptionsHash } from '../options';
import { ClientOptions, FeatureFlag, RequestArgs, RequestOptions } from '../types';
import { createError } from './error';
import { withRequestHeaders } from './headers';
import { withRequestLogging } from './log';
import { withRequestTelemetry } from './telemetry';
import { hasOwn, joinAnd, mergeHooks, tryParse } from './utils';

export const DEFAULT_OPTIONS: Partial<ClientOptions> = {
  host: 'https://api.magicbell.com',
  timeout: 30_000,
  maxRetries: 3,
  maxRetryDelay: 60,
  telemetry: true,
};

export class RequestClient {
  #options: ClientOptions;

  constructor(options: ClientOptions) {
    const missingOptions = ['apiKey'].filter((x) => !hasOwn(options, x));

    if (missingOptions.length) {
      throw new Error(
        `You haven't provided all required options, please provide ${joinAnd(...missingOptions)} to Client(options)`,
      );
    }

    const invalidOptions = Object.keys(options).filter((x) => !isOptionsHash({ [x]: options[x] }));
    if (invalidOptions.length) {
      throw new Error(`You have provided invalid options. Please check the options ${joinAnd(...invalidOptions)}.`);
    }

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

    const url = new URL(path, requestOptions.host);
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
      hooks,
    })
      .then((x) => x.json<TResponse>())
      .catch(async (error) => {
        const body = tryParse(await error?.response?.text());

        throw createError({
          code: error.code,
          name: error.name,
          message: error.message,
          type: error['type'],
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          ...body?.errors?.[0],
        });
      });
  }
}
