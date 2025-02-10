import z, { ZodType } from 'zod';

import { Environment } from '../environment.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { ContentType, HttpMethod, RequestConfig, RetryOptions, SdkConfig, ValidationOptions } from '../types.js';
import {
  CreateRequestParameters,
  Request,
  RequestPagination,
  RequestParameter,
  ResponseDefinition,
} from './request.js';

export class RequestBuilder<Page extends unknown[] = unknown[]> {
  private params: CreateRequestParameters<Page>;

  constructor() {
    this.params = {
      baseUrl: Environment.DEFAULT,
      method: 'GET',
      path: '',
      config: {},
      responses: [],
      requestSchema: z.any(),
      requestContentType: ContentType.Json,
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

  setRetryAttempts(sdkConfig?: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<Page> {
    if (requestConfig?.retry?.attempts !== undefined) {
      this.params.retry.attempts = requestConfig.retry.attempts;
    } else if (sdkConfig?.retry?.attempts !== undefined) {
      this.params.retry.attempts = sdkConfig.retry.attempts;
    }

    return this;
  }

  setRetryDelayMs(sdkConfig?: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<Page> {
    if (requestConfig?.retry?.delayMs !== undefined) {
      this.params.retry.delayMs = requestConfig.retry.delayMs;
    } else if (sdkConfig?.retry?.delayMs !== undefined) {
      this.params.retry.delayMs = sdkConfig.retry.delayMs;
    }

    return this;
  }

  setResponseValidation(sdkConfig: SdkConfig, requestConfig?: RequestConfig): RequestBuilder<Page> {
    if (requestConfig?.validation?.responseValidation !== undefined) {
      this.params.validation.responseValidation = requestConfig.validation.responseValidation;
    } else if (sdkConfig?.validation?.responseValidation !== undefined) {
      this.params.validation.responseValidation = sdkConfig.validation.responseValidation;
    }

    return this;
  }

  setBaseUrl(sdkConfig: SdkConfig): RequestBuilder<Page> {
    if (sdkConfig?.baseUrl !== undefined) {
      this.params.baseUrl = sdkConfig.baseUrl;
    }

    return this;
  }

  setMethod(method: HttpMethod): RequestBuilder<Page> {
    this.params.method = method;
    return this;
  }

  setPath(path: string): RequestBuilder<Page> {
    this.params.path = path;
    return this;
  }

  setConfig(config: SdkConfig): RequestBuilder<Page> {
    this.params.config = config;
    return this;
  }

  setRequestContentType(contentType: ContentType): RequestBuilder<Page> {
    this.params.requestContentType = contentType;
    return this;
  }

  setRequestSchema(requestSchema: ZodType): RequestBuilder<Page> {
    this.params.requestSchema = requestSchema;
    return this;
  }

  setPagination(pagination: RequestPagination<Page>): RequestBuilder<Page> {
    this.params.pagination = pagination;
    return this;
  }

  addResponse(response: ResponseDefinition): RequestBuilder<Page> {
    this.params.responses.push(response);
    return this;
  }

  addBody(body?: any): RequestBuilder<Page> {
    if (body !== undefined) {
      this.params.body = body;
    }
    return this;
  }

  addPathParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.pathParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? true,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
    });

    return this;
  }

  addQueryParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.queryParams.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.FORM,
      encode: param.encode ?? true,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
    });

    return this;
  }

  addHeaderParam(param: Partial<RequestParameter>): RequestBuilder<Page> {
    if (param.value === undefined || param.key === undefined) {
      return this;
    }

    this.params.headers.set(param.key, {
      key: param.key,
      value: param.value,
      explode: param.explode ?? true,
      style: param.style ?? SerializationStyle.SIMPLE,
      encode: param.encode ?? false,
      isLimit: !!param.isLimit,
      isOffset: !!param.isOffset,
    });

    return this;
  }

  public build(): Request<Page> {
    return new Request<Page>(this.params);
  }
}
