import axios, { AxiosError, AxiosResponse } from 'axios';

import { computeUserKey } from './lib/crypto';
import { getClientId, getClientUserAgent, getUserAgent } from './lib/env';
import { createError } from './lib/error';
import { normalizeHeaders } from './lib/headers';
import { Logger } from './lib/log';
import { compact, hasOwn, joinAnd, sleep, uuid4 } from './lib/utils';
import { isOptionsHash } from './options';
import { NotificationPreferences } from './resources/notification-preferences';
import { Notifications } from './resources/notifications';
import { Subscriptions } from './resources/subscriptions';
import { Users } from './resources/users';
import { ClientOptions, RequestArgs, RequestMethod, RequestOptions } from './types';

// some environments, like vscode extensions, don't have the XMLHttpRequest object defined.
if (typeof XMLHttpRequest !== 'function') {
  axios.defaults.adapter = require('axios/lib/adapters/http');
}

export const DEFAULT_OPTIONS: Partial<ClientOptions> = {
  host: 'https://api.magicbell.com',
  timeout: 30_000,
  maxRetries: 3,
  maxRetryDelay: 60,
  telemetry: true,
};

export class Client {
  #userAgent: string;
  #clientId: string;
  #clientUserAgent: string;
  #options: ClientOptions;
  #logger = new Logger();

  #lastRequest: { id: string; runtime: number; duration: number; status: number }[] = [];

  notificationPreferences = new NotificationPreferences(this);
  notifications = new Notifications(this);
  subscriptions = new Subscriptions(this);
  users = new Users(this);

  constructor(options: ClientOptions) {
    const missingOptions = ['apiKey'].filter((x) => !hasOwn(options, x));
    if (missingOptions.length) {
      throw new Error(
        `You haven't provided all required options, please provide ${joinAnd(...missingOptions)} to Client(options)`,
      );
    }

    if (!isOptionsHash(options)) {
      throw new Error(`You have provided invalid options. Please check your client options.`);
    }

    this.#options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.#logger.active = Boolean(this.#options.debug);
    this.#clientUserAgent = getClientUserAgent(options.appInfo);
    this.#userAgent = getUserAgent(options.appInfo);
    this.#clientId = getClientId();
  }

  async request({ method, path, data, params }: RequestArgs, options?: RequestOptions) {
    const requestOptions = { ...this.#options, ...options };

    // compute headers out of the retry-loop, only append the telemetry later
    const headers = this.#getHeaders(requestOptions, method);

    const maxRetries = Math.max(0, requestOptions.maxRetries);
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      let response: AxiosResponse;
      let error: AxiosError | null;
      const startTime = Date.now();

      this.#logger.debug(`${method} ${path}`);
      await axios({
        method,
        url: path,
        baseURL: requestOptions.host,
        headers: {
          ...headers,
          ...normalizeHeaders({
            'X-MAGICBELL-CLIENT-TELEMETRY': this.#getTelemetryHeader(),
          }),
        },
        data,
        // TODO: verify arrays are serialized in a way we support
        params,
        timeout: requestOptions.timeout,
      })
        .then((res) => {
          response = res;
        })
        .catch((e) => {
          error = e;
          response = e.response;
        });

      this.#logLastRequest(response, { startTime });

      if (this.#shouldRetry(response, attempt, maxRetries)) {
        const retryAfter = Number(response.headers['retry-after']);
        await sleep(this.#getSleepTimeInMS(attempt, retryAfter, requestOptions.maxRetryDelay));
        continue;
      }

      if (error) {
        throw createError({
          name: error.name,
          message: error.message,
          type: error['type'],
          status: response.status,
          statusText: response.statusText,
          ...response?.data?.errors?.[0],
        });
      }

      return response.data;
    }
  }

  #getHeaders(options: ClientOptions, method: RequestMethod) {
    return compact(
      normalizeHeaders({
        'User-Agent': this.#userAgent,
        'Idempotency-Key': options.idempotencyKey || this.#getDefaultIdempotencyKey(method, options.maxRetries),
        'X-MAGICBELL-API-KEY': options.apiKey,
        'X-MAGICBELL-API-SECRET': options.apiSecret,
        'X-MAGICBELL-CLIENT-ID': this.#clientId,
        'X-MAGICBELL-CLIENT-USER-AGENT': this.#clientUserAgent,
        'X-MAGICBELL-USER-EMAIL': options.userEmail,
        'X-MAGICBELL-USER-KEY': computeUserKey(options.apiSecret, options.userEmail),
        'X-MAGICBELL-USER-EXTERNAL-ID': options.userExternalId,
      }),
    );
  }

  #logLastRequest(response: AxiosResponse | undefined, { startTime }) {
    // don't collect telemetry if the user opted out.
    if (!this.#options.telemetry || !response?.status) return;

    const headers = normalizeHeaders(response.headers);
    this.#lastRequest.push({
      id: headers['X-Request-Id'],
      runtime: Number(headers['X-Runtime']),
      duration: Date.now() - startTime,
      status: response.status,
    });
  }

  #getTelemetryHeader() {
    const telemetry = this.#lastRequest.pop();
    if (!telemetry) return null;
    return JSON.stringify(telemetry);
  }

  #shouldRetry(response: AxiosResponse | undefined, attempt: number, maxRetries: number) {
    // Do not retry if we are out of retries.
    if (attempt >= maxRetries) {
      return false;
    }

    if (!response) {
      return true;
    }

    // Use the server's recommendation if it provides one
    if (response.headers['should-retry']) {
      return response.headers['should-retry'] === 'true';
    }

    if (response.status === 409 || response.status === 503) {
      // Retry on conflict, rate limit, and availability errors.
      return true;
    }

    // Retry on 5xx's, except POST's, which our idempotency framework would just replay as 500's again anyway.
    if (response.status >= 500 && response.request.method !== 'POST') {
      return true;
    }

    return false;
  }

  #getSleepTimeInMS(numRetries: number, retryAfter = null, maxDelay: number) {
    const firstDelay = 0.5;

    // Apply exponential backoff between firstDelay and maxRetryDelay
    let sleepSeconds = Math.min(firstDelay * Math.pow(numRetries, 2), maxDelay);

    // Apply some jitter by randomizing the value in the range of 75% - 100% of sleepSeconds.
    sleepSeconds *= 0.75 * (1 + Math.random());

    // But never sleep less than the base sleep seconds.
    sleepSeconds = Math.min(Math.max(firstDelay, sleepSeconds), maxDelay);

    // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
    if (Number.isInteger(retryAfter) && retryAfter <= 60) {
      sleepSeconds = Math.max(sleepSeconds, retryAfter);
    }

    return sleepSeconds * 1000;
  }

  #getDefaultIdempotencyKey(method: RequestMethod, maxRetries: number) {
    if (method !== 'POST' || maxRetries === 0) return;
    return `magicbell-retry-${uuid4()}`;
  }
}
