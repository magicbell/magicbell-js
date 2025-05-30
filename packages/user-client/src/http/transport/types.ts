import { ZodType } from 'zod';

import { ThrowableError } from '../errors/throwable-error.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { ContentType, HttpMethod, RetryOptions, SdkConfig, ValidationOptions } from '../types.js';

export interface ResponseDefinition {
  schema: ZodType;
  contentType: ContentType;
  status: number;
}

export interface ErrorDefinition {
  error: new (...args: any[]) => ThrowableError;
  contentType: ContentType;
  status: number;
}

export interface CreateRequestParameters<Page = unknown[]> {
  baseUrl: string;
  method: HttpMethod;
  body?: any;
  headers: Map<string, RequestParameter>;
  queryParams: Map<string, RequestParameter>;
  pathParams: Map<string, RequestParameter>;
  path: string;
  config: SdkConfig;
  responses: ResponseDefinition[];
  errors: ErrorDefinition[];
  requestSchema: ZodType;
  requestContentType: ContentType;
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
