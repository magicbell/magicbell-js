import axios, { AxiosError } from 'axios';

import HTTPClient, { Headers } from './HTTPClient';
import throwHttpError from './httpExceptions';

// Ignore TS errors when checking if we are running inside Deno or Bun
declare const Deno: any;
declare const Bun: any;

export default class HTTPLibrary implements HTTPClient {
  readonly retryAttempts: number = 3;
  readonly retryDelayMs: number = 150;

  async get(url: string, input: any, headers: Headers, retry = false): Promise<any> {
    const request = () =>
      axios.get(url, {
        headers: { ...headers, ...this.getUserAgentHeader() },
        data: Object.keys(input).length > 0 ? input : undefined,
      });

    const response = retry ? await this.retry(this.retryAttempts, request, this.retryDelayMs) : await request();
    return HTTPLibrary.handleResponse(response);
  }

  async post(url: string, input: any, headers: Headers, retry = false): Promise<any> {
    const request = () =>
      axios.post(url, input, {
        headers: { ...headers, ...this.getUserAgentHeader() },
      });

    const response = retry ? await this.retry(this.retryAttempts, request, this.retryDelayMs) : await request();

    return HTTPLibrary.handleResponse(response);
  }

  async delete(url: string, input: any, headers: Headers, retry = false): Promise<any> {
    const request = () =>
      axios.delete(url, {
        headers: { ...headers, ...this.getUserAgentHeader() },
        data: input,
      });

    const response = retry ? await this.retry(this.retryAttempts, request, this.retryDelayMs) : await request();

    return HTTPLibrary.handleResponse(response);
  }

  async put(url: string, input: any, headers: Headers, retry = false): Promise<any> {
    const request = () =>
      axios.put(url, input, {
        headers: { ...headers, ...this.getUserAgentHeader() },
      });

    const response = retry ? await this.retry(this.retryAttempts, request, this.retryDelayMs) : await request();

    return HTTPLibrary.handleResponse(response);
  }

  async patch(url: string, input: any, headers: Headers, retry = false): Promise<any> {
    const request = () =>
      axios.patch(url, input, {
        headers: { ...headers, ...this.getUserAgentHeader() },
      });

    const response = retry ? await this.retry(this.retryAttempts, request, this.retryDelayMs) : await request();

    return HTTPLibrary.handleResponse(response);
  }

  async retry(retries: number, callbackFn: () => any, delay: number): Promise<any> {
    let result: any;

    try {
      result = await callbackFn();
    } catch (e: any) {
      if ((e as AxiosError).isAxiosError) {
        if (e.response) {
          if (![500, 503, 504].includes(e.response.status)) {
            return e.response;
          }
        }
      }
      if (retries > 1) {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, delay));
        result = await this.retry(retries - 1, callbackFn, delay * 2);
      } else {
        throw e;
      }
    }

    return result;
  }

  private static handleResponse(response: any) {
    if (response.status >= 400) {
      throwHttpError(response);
    }

    return response;
  }

  private getUserAgentHeader(): Headers {
    const userAgentBase = 'Client/0.1.0';

    let userAgent = '';
    if (typeof window !== 'undefined') {
      return {};
    } else if (typeof process !== 'undefined') {
      userAgent = `Node.js/${process.version} ${userAgentBase}`;
    } else if (typeof Deno !== 'undefined') {
      userAgent = `Deno/${Deno.version.deno} ${userAgentBase}`;
    } else if (typeof Bun !== 'undefined') {
      userAgent = `Bun/${Bun.version} ${userAgentBase}`;
    } else {
      userAgent = userAgentBase;
    }

    return { 'User-Agent': userAgent };
  }
}
