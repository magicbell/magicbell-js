import { HttpError } from '../error.js';
import { HttpMethod, HttpResponse } from '../types.js';
import { Request } from './request.js';

interface HttpAdapter {
  send(): Promise<HttpResponse>;
}

export class RequestFetchAdapter<T> implements HttpAdapter {
  private requestInit: RequestInit = {};

  constructor(private request: Request<T>) {
    this.setMethod(request.method);
    this.setHeaders(request.getHeaders());
    this.setBody(request.body);
    this.setTimeout(request.config.timeoutMs);
  }

  public async send(): Promise<HttpResponse<T>> {
    const response = await fetch(this.request.constructFullUrl(), this.requestInit);

    const metadata = {
      status: response.status,
      statusText: response.statusText || '',
      headers: this.getHeaders(response),
    };

    return {
      metadata,
      raw: await response.clone().arrayBuffer(),
    };
  }

  private setMethod(method: HttpMethod) {
    if (!method) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      method,
    };
  }

  private setBody(body: ReadableStream<Uint8Array> | null) {
    if (!body) {
      return;
    }
    this.requestInit = {
      ...this.requestInit,
      body,
    };
  }

  private setHeaders(headers: HeadersInit | undefined) {
    if (!headers) {
      return;
    }

    this.requestInit = {
      ...this.requestInit,
      headers,
    };
  }

  private setTimeout(timeoutMs: number | undefined) {
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
}
