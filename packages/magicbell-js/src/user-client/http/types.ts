import { ZodType } from 'zod';

import { Environment } from './environment.js';
import { Request } from './transport/request.js';

export type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';

export interface SdkConfig {
  baseUrl?: string;
  environment?: Environment;
  timeoutMs?: number;
  token?: string;
  retry?: RetryOptions;
  validation?: ValidationOptions;
}

export interface HttpMetadata {
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpResponse<T = unknown> {
  data?: T;
  metadata: HttpMetadata;
  raw: ArrayBuffer;
}

export interface PaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  // Marker interface for pagination responses
}

export interface CursorPaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  nextCursor?: string | null;
}

export interface RequestHandler {
  next?: RequestHandler;

  handle<T>(request: Request): Promise<HttpResponse<T>>;
  stream<T>(request: Request): AsyncGenerator<HttpResponse<T>>;
}

export enum ContentType {
  Json = 'json',
  Xml = 'xml',
  Pdf = 'pdf',
  Image = 'image',
  File = 'file',
  Binary = 'binary',
  FormUrlEncoded = 'form',
  Text = 'text',
  MultipartFormData = 'multipartFormData',
  EventStream = 'eventStream',
  NoContent = 'noContent',
}

export interface Options<T> {
  responseSchema: ZodType<T, any, any>;
  requestSchema?: ZodType;
  body?: any;
  requestContentType?: ContentType;
  responseContentType?: ContentType;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
  retry?: RetryOptions;
}

export interface RequestConfig {
  retry?: RetryOptions;
  validation?: ValidationOptions;
  baseUrl?: string;
}

export interface RetryOptions {
  attempts: number;
  delayMs?: number;
}

export interface ValidationOptions {
  responseValidation?: boolean;
}
