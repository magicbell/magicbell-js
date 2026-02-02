import { ZodType } from 'zod';

import { Environment } from './environment.js';
import { Request } from './transport/request.js';

/**
 * Standard HTTP methods supported by the SDK.
 */
export type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';

/**
 * SDK configuration interface.
 * Contains all settings required to initialize and configure the SDK.
 */
export interface SdkConfig {
  baseUrl?: string;
  environment?: Environment;
  timeoutMs?: number;
  token?: string;
  retry?: RetryOptions;
  validation?: ValidationOptions;
}

/**
 * Metadata about an HTTP response.
 * Contains status information and headers from the server response.
 */
export interface HttpMetadata {
  /** HTTP status code (e.g., 200, 404, 500) */
  status: number;
  /** HTTP status text message (e.g., "OK", "Not Found") */
  statusText: string;
  /** Response headers as key-value pairs */
  headers: Record<string, string>;
}

/**
 * Standard HTTP response with typed data.
 * @template T - The type of the response data
 */
export interface HttpResponse<T = unknown> {
  /** Parsed response data (optional) */
  data?: T;
  /** Response metadata (status, headers, etc.) */
  metadata: HttpMetadata;
  /** Raw response object from the HTTP client */
  raw: ArrayBuffer;
}

/**
 * HTTP response for paginated API endpoints.
 * Marker interface extending HttpResponse for type safety with pagination.
 * @template T - The type of a single page of data
 */
export interface PaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  // Marker interface for pagination responses
}

/**
 * HTTP response for cursor-paginated API endpoints.
 * Includes a cursor for fetching the next page of results.
 * @template T - The type of a single page of data
 */
export interface CursorPaginatedHttpResponse<T = unknown> extends HttpResponse<T> {
  /** Cursor string for fetching the next page, null if no more pages, undefined if not applicable */
  nextCursor?: string | null;
}

/**
 * Interface for request handlers in the chain of responsibility pattern.
 * Handlers process requests sequentially, each performing specific operations.
 */
export interface RequestHandler {
  /** Reference to the next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   */
  handle<T>(request: Request): Promise<HttpResponse<T>>;

  /**
   * Handles a streaming HTTP request.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   */
  stream<T>(request: Request): AsyncGenerator<HttpResponse<T>>;
}

/**
 * Supported content types for HTTP requests and responses.
 * Determines how the SDK serializes requests and parses responses.
 */
export enum ContentType {
  /** JSON format (application/json) */
  Json = 'json',
  /** XML format (application/xml, text/xml) */
  Xml = 'xml',
  /** PDF document (application/pdf) */
  Pdf = 'pdf',
  /** Image file (image/*) */
  Image = 'image',
  /** Generic file */
  File = 'file',
  /** Binary data (application/octet-stream) */
  Binary = 'binary',
  /** URL-encoded form data (application/x-www-form-urlencoded) */
  FormUrlEncoded = 'form',
  /** Plain text (text/plain) */
  Text = 'text',
  /** Multipart form data for file uploads (multipart/form-data) */
  MultipartFormData = 'multipartFormData',
  /** Server-sent events stream (text/event-stream) */
  EventStream = 'eventStream',
  /** No content (HTTP 204) */
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
