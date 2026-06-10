import { ZodType } from 'zod';

import { ThrowableError } from '../errors/throwable-error.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { ContentType, HttpMethod, RetryOptions, SdkConfig, ValidationOptions } from '../types.js';

/**
 * Defines an expected response format with schema validation.
 * Used to match and validate responses based on content type and status code.
 */
export interface ResponseDefinition {
  /** Zod schema for validating the response body */
  schema: ZodType;
  /** The content type of this response (e.g., 'application/json') */
  contentType: ContentType;
  /** The HTTP status code this definition applies to */
  status: number;
}

/**
 * Defines an error response format with custom error class.
 * Used to throw typed errors based on content type and status code.
 */
export interface ErrorDefinition {
  /** Constructor for the error class to instantiate */
  error: new (...args: any[]) => ThrowableError;
  /** The content type of this error response */
  contentType: ContentType;
  /** The HTTP status code this error applies to */
  status: number;
}

/**
 * Parameters required to create a Request instance.
 * Contains all configuration needed for HTTP execution, validation, and error handling.
 *
 * @template Page - The type of paginated data items
 */
export interface CreateRequestParameters<Page = unknown[]> {
  baseUrl: string;
  method: HttpMethod;
  body?: any;
  headers: Map<string, RequestParameter>;
  queryParams: Map<string, RequestParameter>;
  pathParams: Map<string, RequestParameter>;
  cookies: Map<string, RequestParameter>;
  path: string;
  config: SdkConfig;
  responses: ResponseDefinition[];
  errors: ErrorDefinition[];
  requestSchema: ZodType;
  requestContentType: ContentType;
  validation: ValidationOptions;
  retry: RetryOptions;
  pagination?: RequestPagination<Page> | RequestCursorPagination<Page>;
  filename?: string;
  filenames?: string[];
}

/**
 * Represents a request parameter with serialization metadata.
 * Wraps a value with OpenAPI serialization instructions for proper encoding.
 */
export interface RequestParameter {
  /** The parameter name (may be undefined for path substitution) */
  key: string | undefined;
  /** The actual parameter value */
  value: unknown;
  /** Whether to explode arrays/objects into multiple parameters */
  explode: boolean;
  /** Whether to URL-encode the value */
  encode: boolean;
  /** The OpenAPI serialization style (e.g., SIMPLE, FORM, MATRIX) */
  style: SerializationStyle;
  /** Whether this parameter is a pagination limit */
  isLimit: boolean;
  /** Whether this parameter is a pagination offset */
  isOffset: boolean;
  /** Whether this parameter is a pagination cursor */
  isCursor: boolean;
}

/**
 * Configuration for limit-offset pagination.
 * Used for traditional page-based pagination with size and offset.
 *
 * @template Page - The type of page data
 */
export interface RequestPagination<Page> {
  /** The number of items per page */
  pageSize?: number;
  /** JSON path to extract page data from response */
  pagePath: string[];
  /** Zod schema for validating page data */
  pageSchema?: ZodType<Page, any, any>;
}

/**
 * Configuration for cursor-based pagination.
 * Used for stateless pagination with cursor tokens.
 *
 * @template Page - The type of page data
 */
export interface RequestCursorPagination<Page> {
  /** JSON path to extract page data from response */
  pagePath: string[];
  /** Zod schema for validating page data */
  pageSchema?: ZodType<Page, any, any>;
  /** JSON path to extract next cursor from response */
  cursorPath: string[];
  /** Zod schema for validating cursor value */
  cursorSchema?: ZodType<string | null | undefined>;
}

/**
 * Type guard to determine if pagination configuration is cursor-based.
 *
 * @template Page - The type of page data
 * @param pagination - The pagination configuration to check
 * @returns true if cursor-based pagination, false otherwise
 */
export function isRequestCursorPagination<Page>(
  pagination: RequestPagination<Page> | RequestCursorPagination<Page> | undefined,
): pagination is RequestCursorPagination<Page> {
  return !!pagination && 'cursorPath' in pagination;
}
