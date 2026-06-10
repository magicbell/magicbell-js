import { ZodType } from 'zod';

import { HttpRequest } from '../hooks/hook.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { CookieSerializer } from '../serialization/cookie-serializer.js';
import { HeaderSerializer } from '../serialization/header-serializer.js';
import { PathSerializer } from '../serialization/path-serializer.js';
import { QuerySerializer } from '../serialization/query-serializer.js';
import { ContentType, HttpMethod, RetryOptions, SdkConfig, ValidationOptions } from '../types.js';
import {
  CreateRequestParameters,
  ErrorDefinition,
  isRequestCursorPagination,
  RequestCursorPagination,
  RequestPagination,
  RequestParameter,
  ResponseDefinition,
} from './types.js';

/**
 * Represents an HTTP request with all necessary configuration and parameters.
 * Handles path/query/header/cookie serialization, pagination, validation, and retry logic.
 * This is the core request object passed through the handler chain for execution.
 *
 * @template PageSchema - The type of paginated data returned by this request
 */
export class Request<PageSchema = unknown[]> {
  public baseUrl = '';

  public headers: Map<string, RequestParameter> = new Map();

  public queryParams: Map<string, RequestParameter> = new Map();

  public pathParams: Map<string, RequestParameter> = new Map();

  public cookies: Map<string, RequestParameter> = new Map();

  public body?: any;

  public method: HttpMethod;

  public path: string;

  public config: SdkConfig;

  public responses: ResponseDefinition[];

  public errors: ErrorDefinition[];

  public requestSchema: ZodType;

  public requestContentType: ContentType;

  public validation: ValidationOptions = {} as any;

  public retry: RetryOptions = {} as any;

  public pagination?: RequestPagination<PageSchema> | RequestCursorPagination<PageSchema>;

  public filename?: string;

  public filenames?: string[];

  private readonly pathPattern: string;

  constructor(params: CreateRequestParameters<PageSchema>) {
    this.baseUrl = params.baseUrl;
    this.method = params.method;
    this.pathPattern = params.path;
    this.body = params.body;
    this.path = this.constructPath();
    this.config = params.config;
    this.pathParams = params.pathParams;
    this.headers = params.headers;
    this.queryParams = params.queryParams;
    this.cookies = params.cookies;
    this.responses = params.responses;
    this.errors = params.errors;
    this.requestSchema = params.requestSchema;
    this.requestContentType = params.requestContentType;
    this.retry = params.retry;
    this.validation = params.validation;
    this.pagination = params.pagination;
    this.filename = params.filename;
    this.filenames = params.filenames;
  }

  /**
   * Adds a header parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The header name
   * @param param - The parameter configuration including value, style, and encoding options
   */
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

  /**
   * Adds a query parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The query parameter name
   * @param param - The parameter configuration including value, style, and encoding options
   */
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

  /**
   * Adds a path parameter to the request with OpenAPI serialization rules.
   *
   * @param key - The path parameter name (matches template variable in path pattern)
   * @param param - The parameter configuration including value, style, and encoding options
   */
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

  /**
   * Sets the request body if the value is defined.
   *
   * @param body - The request body to send
   */
  addBody(body: any): void {
    if (body === undefined) {
      return;
    }

    this.body = body;
  }

  /**
   * Updates this request from a modified hook request.
   * Used after hooks modify the request to sync changes back to the internal Request object.
   *
   * @param hookRequest - The modified request from hook processing
   */
  public updateFromHookRequest(hookRequest: HttpRequest): void {
    this.baseUrl = hookRequest.baseUrl;
    this.method = hookRequest.method;
    this.path = hookRequest.path;
    this.body = hookRequest.body;
  }

  /**
   * Constructs the complete URL by combining base URL, path with substituted parameters,
   * and serialized query string.
   *
   * @returns The fully constructed URL ready for HTTP execution
   */
  public constructFullUrl(): string {
    const queryString = new QuerySerializer().serialize(this.queryParams);
    const path = this.constructPath();
    const baseUrl = this.baseUrl;

    return `${baseUrl}${path}${queryString}`;
  }

  /**
   * Creates a copy of this request with optional parameter overrides.
   * Useful for pagination where you need to modify parameters while keeping the rest intact.
   *
   * @param overrides - Optional parameters to override in the copied request
   * @returns A new Request instance with the specified overrides
   */
  public copy(overrides?: Partial<CreateRequestParameters>) {
    const createRequestParams: CreateRequestParameters = {
      baseUrl: overrides?.baseUrl ?? this.baseUrl,
      errors: overrides?.errors ?? this.errors,
      method: overrides?.method ?? this.method,
      path: overrides?.path ?? this.path,
      body: overrides?.body ?? this.body,
      config: overrides?.config ?? this.config,
      pathParams: overrides?.pathParams ?? this.pathParams,
      queryParams: overrides?.queryParams ?? this.queryParams,
      headers: overrides?.headers ?? this.headers,
      cookies: overrides?.cookies ?? this.cookies,
      responses: overrides?.responses ?? this.responses,
      requestSchema: overrides?.requestSchema ?? this.requestSchema,
      requestContentType: overrides?.requestContentType ?? this.requestContentType,
      retry: overrides?.retry ?? this.retry,
      validation: overrides?.validation ?? this.validation,
      filename: overrides?.filename ?? this.filename,
      filenames: overrides?.filenames ?? this.filenames,
    };
    return new Request({
      ...createRequestParams,
      ...overrides,
    });
  }

  /**
   * Serializes headers to a format suitable for HTTP execution.
   *
   * @returns Serialized headers as HeadersInit, or undefined if no headers
   */
  public getHeaders(): HeadersInit | undefined {
    if (!this.headers || !this.headers.size) {
      return undefined;
    }

    return new HeaderSerializer().serialize(this.headers);
  }

  /**
   * Serializes cookies to a format suitable for HTTP execution.
   *
   * @returns Serialized cookies as a record, or undefined if no cookies
   */
  public getCookies(): Record<string, string> | undefined {
    if (!this.cookies || !this.cookies.size) {
      return undefined;
    }

    return new CookieSerializer().serialize(this.cookies);
  }

  /**
   * Advances pagination parameters to fetch the next page.
   * Handles both cursor-based and limit-offset pagination strategies.
   *
   * @param cursor - The cursor value for cursor-based pagination (optional for limit-offset)
   */
  public nextPage(cursor?: string): void {
    if (!this.pagination) {
      return;
    }

    // Check if this is cursor pagination using type guard
    if (isRequestCursorPagination(this.pagination)) {
      const cursorParam = this.getCursorParam();
      if (cursorParam && cursor !== undefined) {
        cursorParam.value = cursor;
      }
      return;
    }

    // Handle limit-offset pagination
    const offsetParam = this.getOffsetParam();
    if (offsetParam) {
      if (this.pagination.pageSize === undefined) {
        throw new Error('pageSize is required for limit-offset pagination');
      }
      offsetParam.value = Number(offsetParam.value) + this.pagination.pageSize;
    }
  }

  private constructPath(): string {
    return new PathSerializer().serialize(this.pathPattern, this.pathParams);
  }

  private getOffsetParam(): RequestParameter | undefined {
    const offsetParam = this.getAllParams().find((param) => param.isOffset);
    return offsetParam;
  }

  private getCursorParam(): RequestParameter | undefined {
    const cursorParam = this.getAllParams().find((param) => param.isCursor);
    return cursorParam;
  }

  private getAllParams(): RequestParameter[] {
    const allParams: RequestParameter[] = [];

    this.headers.forEach((val, _) => {
      allParams.push(val);
    });

    this.queryParams.forEach((val, _) => {
      allParams.push(val);
    });

    this.pathParams.forEach((val, _) => {
      allParams.push(val);
    });

    this.cookies.forEach((val, _) => {
      allParams.push(val);
    });

    return allParams;
  }
}
