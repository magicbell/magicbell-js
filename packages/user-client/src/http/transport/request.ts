import { ZodType } from 'zod';

import { HttpRequest } from '../hooks/hook.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { HeaderSerializer } from '../serialization/header-serializer.js';
import { PathSerializer } from '../serialization/path-serializer.js';
import { QuerySerializer } from '../serialization/query-serializer.js';
import { ContentType, HttpMethod, RetryOptions, SdkConfig, ValidationOptions } from '../types.js';

export interface CreateRequestParameters<FullResponse, Page = unknown[]> {
  baseUrl: string;
  method: HttpMethod;
  body?: any;
  headers: Map<string, RequestParameter>;
  queryParams: Map<string, RequestParameter>;
  pathParams: Map<string, RequestParameter>;
  path: string;
  config: SdkConfig;
  responseSchema: ZodType<FullResponse, any, any>;
  requestSchema: ZodType;
  requestContentType: ContentType;
  responseContentType: ContentType;
  validation: ValidationOptions;
  retry: RetryOptions;
  pagination?: RequestPagination<Page>;
}

export interface RequestParameter {
  key: string | undefined;
  value: unknown;
  explode: boolean;
  encode: boolean;
  style: SerializationStyle;
  isLimit: boolean;
  isOffset: boolean;
}

export interface RequestPagination<Page> {
  pageSize: number;
  pagePath: string[];
  pageSchema?: ZodType<Page, any, any>;
}

export class Request<T = unknown, PageSchema = unknown[]> {
  public baseUrl = '';

  public headers: Map<string, RequestParameter> = new Map();

  public queryParams: Map<string, RequestParameter> = new Map();

  public pathParams: Map<string, RequestParameter> = new Map();

  public body?: any;

  public method: HttpMethod;

  public path: string;

  public config: SdkConfig;

  public responseSchema: ZodType<T, any, any>;

  public requestSchema: ZodType;

  public requestContentType: ContentType;

  public responseContentType: ContentType;

  public validation: ValidationOptions = {} as any;

  public retry: RetryOptions = {} as any;

  public pagination?: RequestPagination<PageSchema>;

  private readonly pathPattern: string;

  constructor(params: CreateRequestParameters<T, PageSchema>) {
    this.baseUrl = params.baseUrl;
    this.method = params.method;
    this.pathPattern = params.path;
    this.body = params.body;
    this.path = this.constructPath();
    this.config = params.config;
    this.pathParams = params.pathParams;
    this.headers = params.headers;
    this.queryParams = params.queryParams;
    this.responseSchema = params.responseSchema;
    this.requestSchema = params.requestSchema;
    this.requestContentType = params.requestContentType;
    this.responseContentType = params.responseContentType;
    this.retry = params.retry;
    this.validation = params.validation;
    this.pagination = params.pagination;
  }

  addHeaderParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = false;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.SIMPLE;
    }

    if (param.encode === undefined) {
      param.encode = false;
    }

    this.headers.set(key, param);
  }

  addQueryParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = true;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.FORM;
    }

    if (param.encode === undefined) {
      param.encode = true;
    }

    this.queryParams.set(key, param);
  }

  addPathParam(key: string, param: RequestParameter): void {
    if (param.value === undefined) {
      return;
    }

    if (param.explode === undefined) {
      param.explode = false;
    }

    if (param.style === undefined) {
      param.style = SerializationStyle.SIMPLE;
    }

    if (param.encode === undefined) {
      param.encode = true;
    }

    this.pathParams.set(key, param);
  }

  addBody(body: any): void {
    if (body === undefined) {
      return;
    }

    this.body = body;
  }

  public updateFromHookRequest(hookRequest: HttpRequest): void {
    this.baseUrl = hookRequest.baseUrl;
    this.method = hookRequest.method;
    this.path = hookRequest.path;
    this.body = hookRequest.body;
  }

  public constructFullUrl(): string {
    const queryString = new QuerySerializer().serialize(this.queryParams);
    const path = this.constructPath();
    return `${this.baseUrl}${path}${queryString}`;
  }

  public copy(overrides?: Partial<CreateRequestParameters<T>>) {
    const createRequestParams: CreateRequestParameters<T> = {
      baseUrl: overrides?.baseUrl ?? this.baseUrl,
      method: overrides?.method ?? this.method,
      path: overrides?.path ?? this.path,
      body: overrides?.body ?? this.body,
      config: overrides?.config ?? this.config,
      pathParams: overrides?.pathParams ?? this.pathParams,
      queryParams: overrides?.queryParams ?? this.queryParams,
      headers: overrides?.headers ?? this.headers,
      responseSchema: overrides?.responseSchema ?? this.responseSchema,
      requestSchema: overrides?.requestSchema ?? this.requestSchema,
      requestContentType: overrides?.requestContentType ?? this.requestContentType,
      responseContentType: overrides?.responseContentType ?? this.responseContentType,
      retry: overrides?.retry ?? this.retry,
      validation: overrides?.validation ?? this.validation,
    };
    return new Request<T>({
      ...createRequestParams,
      ...overrides,
    });
  }

  public getHeaders(): HeadersInit | undefined {
    if (!this.headers || !this.headers.size) {
      return undefined;
    }

    return new HeaderSerializer().serialize(this.headers);
  }

  public nextPage() {
    if (!this.pagination) {
      return;
    }

    const offsetParam = this.getOffsetParam();
    if (!offsetParam) {
      return;
    }

    offsetParam.value = Number(offsetParam.value) + this.pagination.pageSize;
  }

  private constructPath(): string {
    return new PathSerializer().serialize(this.pathPattern, this.pathParams);
  }

  private getOffsetParam(): RequestParameter | undefined {
    const offsetParam = this.getAllParams().find((param) => param.isOffset);
    return offsetParam;
  }

  private getAllParams(): RequestParameter[] {
    const allParams: RequestParameter[] = [];

    this.headers.forEach((val, key) => {
      allParams.push(val);
    });

    this.queryParams.forEach((val, key) => {
      allParams.push(val);
    });

    this.pathParams.forEach((val, key) => {
      allParams.push(val);
    });

    return allParams;
  }
}
