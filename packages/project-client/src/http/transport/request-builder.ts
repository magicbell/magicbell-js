import z, { ZodType } from 'zod';

import { Environment } from '../environment.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { ContentType, HttpMethod, RequestConfig, SdkConfig } from '../types.js';
import { CreateRequestParameters, Request, RequestParameter } from './request.js';

export class RequestBuilder<T> {
  private params: CreateRequestParameters<T>;

  constructor() {
    this.params = {
      baseUrl: Environment.DEFAULT,
      method: 'GET',
      path: '',
      config: {},
      responseSchema: z.any(),
      requestSchema: z.any(),
      requestContentType: ContentType.Json,
      responseContentType: ContentType.Json,
      retry: {
        attempts: 3,
        delayMs: 150,
      },
      validation: {
        responseValidation: true,
      },
      pathParams: new Map(),
      queryParams: new Map(),
      headers: new Map(),
    };
  }

  setRetryAttempts(sdkConfig?: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<T> {
    if (requestConfig?.retry?.attempts !== undefined) {
      this.params.retry.attempts = requestConfig.retry.attempts;
    } else if (sdkConfig?.retry?.attempts !== undefined) {
      this.params.retry.attempts = sdkConfig.retry.attempts;
    }

    return this;
  }

  setRetryDelayMs(sdkConfig?: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<T> {
    if (requestConfig?.retry?.delayMs !== undefined) {
      this.params.retry.delayMs = requestConfig.retry.delayMs;
    } else if (sdkConfig?.retry?.delayMs !== undefined) {
      this.params.retry.delayMs = sdkConfig.retry.delayMs;
    }

    return this;
  }

  setResponseValidation(sdkConfig: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<T> {
    if (requestConfig?.validation?.responseValidation !== undefined) {
      this.params.validation.responseValidation = requestConfig.validation.responseValidation;
    } else if (sdkConfig?.validation?.responseValidation !== undefined) {
      this.params.validation.responseValidation = sdkConfig.validation.responseValidation;
    }

    return this;
  }

  setBaseUrl(sdkConfig: SdkConfig): RequestBuilder<T> {
    if (sdkConfig?.baseUrl !== undefined) {
      this.params.baseUrl = sdkConfig.baseUrl;
    }

    return this;
  }

  setMethod(method: HttpMethod): RequestBuilder<T> {
    this.params.method = method;
    return this;
  }

  setPath(path: string): RequestBuilder<T> {
    this.params.path = path;
    return this;
  }

  setConfig(config: SdkConfig): RequestBuilder<T> {
    this.params.config = config;
    return this;
  }

  setRequestContentType(contentType: ContentType): RequestBuilder<T> {
    this.params.requestContentType = contentType;
    return this;
  }

  setResponseContentType(contentType: ContentType): RequestBuilder<T> {
    this.params.responseContentType = contentType;
    return this;
  }

  setRequestSchema(requestSchema: ZodType): RequestBuilder<T> {
    this.params.requestSchema = requestSchema;
    return this;
  }

  setResponseSchema(responseSchema: ZodType): RequestBuilder<T> {
    this.params.responseSchema = responseSchema;
    return this;
  }

  addBody(body?: any): RequestBuilder<T> {
    if (body !== undefined) {
      this.params.body = body;
    }
    return this;
  }

  addPathParam(param: Partial<RequestParameter>): RequestBuilder<T> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.pathParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? true,
    });

    return this;
  }

  addQueryParam(param: Partial<RequestParameter>): RequestBuilder<T> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.queryParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.FORM,
      encode: param.encode ?? true,
    });

    return this;
  }

  addHeaderParam(param: Partial<RequestParameter>): RequestBuilder<T> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.headers.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? false,
    });

    return this;
  }

  public build(): Request<T> {
    return new Request<T>(this.params);
  }
}
