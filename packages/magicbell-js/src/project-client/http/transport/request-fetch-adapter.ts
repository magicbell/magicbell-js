import { HttpError } from '../error.js';
import { HttpMetadata, HttpMethod, HttpResponse } from '../types.js';
import { LineDecoder } from '../utils/line-decoder.js';
import { Request } from './request.js';

/**
 * Interface for HTTP client adapters.
 * Defines the contract for sending HTTP requests and streaming responses.
 */
interface HttpAdapter {
  send(): Promise<HttpResponse>;
  stream(): AsyncGenerator<HttpResponse>;
}

/**
 * Fetch API-based HTTP adapter for executing requests.
 * Uses the native Fetch API to provide a consistent interface for both regular and streaming requests.
 * Handles headers, cookies, timeouts with AbortSignal, and error responses.
 *
 * @template T - The expected response type
 */
export class RequestFetchAdapter<T> implements HttpAdapter {
  private requestInit: RequestInit = {};

  constructor(private request: Request) {
    this.setMethod(request.method);
    this.setHeaders(request.getHeaders());
    this.setCookies(request.getCookies());
    this.setBody(request.body);
    this.setTimeout(request.config.timeoutMs);
  }

  /**
   * Executes the HTTP request and returns the response.
   * Fetches the full response body as an ArrayBuffer.
   *
   * @returns A promise resolving to the HTTP response with metadata and body
   */
  public async send(): Promise<HttpResponse<T>> {
    const response = await fetch(this.request.constructFullUrl(), this.requestInit);

    const metadata: HttpMetadata = {
      status: response.status,
      statusText: response.statusText || '',
      headers: this.getHeaders(response),
    };

    return {
      metadata,
      raw: await response.clone().arrayBuffer(),
    };
  }

  /**
   * Executes the HTTP request as a stream, yielding chunks as they arrive.
   * Uses the Fetch API's ReadableStream and LineDecoder to split into lines.
   *
   * @returns An async generator yielding HTTP response chunks
   * @throws Error if responseHeaders is enabled (streaming not supported with responseHeaders)
   */
  public async *stream(): AsyncGenerator<HttpResponse<T>> {
    const response = await fetch(this.request.constructFullUrl(), this.requestInit);

    const metadata: HttpMetadata = {
      status: response.status,
      statusText: response.statusText || '',
      headers: this.getHeaders(response),
    };

    if (response.status >= 400) {
      throw new HttpError(metadata, await response.clone().arrayBuffer());
    }

    if (!response.body) {
      return yield {
        metadata,
        raw: await response.clone().arrayBuffer(),
      };
    }

    const reader = response.body.getReader();
    const lineDecoder = new LineDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      for (const line of lineDecoder.splitLines(value)) {
        yield {
          metadata,
          raw: this.toArrayBuffer(line),
        };
      }
    }

    for (const line of lineDecoder.flush()) {
      yield {
        metadata,
        raw: this.toArrayBuffer(line),
      };
    }
  }

  private setMethod(method: HttpMethod): void {
    if (!method) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      method,
    };
  }

  private setBody(body: ReadableStream<Uint8Array> | null): void {
    if (!body) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      body,
    };
  }

  private setHeaders(headers: HeadersInit | undefined): void {
    if (!headers) {
      return;
    }

    this.requestInit = {
      ...this.requestInit,
      headers,
    };
  }

  private setCookies(cookies: Record<string, string> | undefined): void {
    if (!cookies || Object.keys(cookies).length === 0) {
      return;
    }

    // Serialize cookies as a Cookie header
    const cookieString = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...this.requestInit.headers,
        Cookie: cookieString,
      },
    };
  }

  private setTimeout(timeoutMs: number | undefined): void {
    if (!timeoutMs) {
      return;
    }

    this.requestInit = {
      ...this.requestInit,
      signal: AbortSignal.timeout(timeoutMs),
    };
  }

  private getHeaders(response: Response): Record<string, string> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });

    return headers;
  }

  private toArrayBuffer(uint8Array: Uint8Array): ArrayBuffer {
    return uint8Array.buffer.slice(uint8Array.byteOffset, uint8Array.byteOffset + uint8Array.byteLength);
  }
}
