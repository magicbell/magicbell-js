import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

import { HttpError } from '../error';
import { HttpMetadata, HttpResponse } from '../types';
import { Request } from './request';

export interface HttpAdapter {
  send(): Promise<HttpResponse>;
}

export class RequestAxiosAdapter<T> implements HttpAdapter {
  private config: AxiosRequestConfig = {
    responseType: 'arraybuffer',
  };

  constructor(private request: Request<T>) {
    this.setHeaders();
    this.setTimeout();
  }

  public async send(): Promise<HttpResponse<T>> {
    const method = this.getMethod();
    const { body } = this.request;
    let axiosResponse: AxiosResponse;

    try {
      if (!!body) {
        axiosResponse = await method(this.request.constructFullUrl(), body, this.config);
      } else {
        axiosResponse = await method(this.request.constructFullUrl(), this.config);
      }
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err;
      }
      axiosResponse = err.response;
    }

    const headerRecord: Record<string, string> = {};
    Object.keys(axiosResponse.headers).forEach((key) => {
      headerRecord[key] = axiosResponse.headers[key];
    });

    const metadata: HttpMetadata = {
      status: axiosResponse.status,
      statusText: axiosResponse.statusText || '',
      headers: headerRecord,
    };

    if (metadata.status >= 400) {
      throw new HttpError(metadata);
    }

    return {
      metadata,
      raw: axiosResponse.data.buffer.slice(
        axiosResponse.data.byteOffset,
        axiosResponse.data.byteOffset + axiosResponse.data.byteLength,
      ),
    };
  }

  private getMethod(): (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse> {
    if (this.request.method === 'POST') {
      return axios.post;
    } else if (this.request.method === 'GET') {
      return axios.get;
    } else if (this.request.method === 'PUT') {
      return axios.put;
    } else if (this.request.method === 'DELETE') {
      return axios.delete;
    }
    throw new Error('invalid method!!!!');
  }

  private setHeaders(): void {
    if (!this.request.headers) {
      return;
    }

    const headersRecord: Record<string, string> = {};
    new Headers(this.request.getHeaders()).forEach((value, key) => {
      headersRecord[key] = value;
    });

    this.config = {
      ...this.config,
      headers: headersRecord,
    };
  }

  private setTimeout(): void {
    this.config = {
      ...this.config,
      timeout: this.request.config.timeout,
    };
  }
}
