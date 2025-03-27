'use strict';

export function createError(rawError: ErrorConfig) {
  for (const field of ['code', 'type', 'status']) {
    switch (rawError[field]) {
      case 'user_identifier_not_provided':
        return new AuthenticationError(rawError);
      case 'invalid_request_error':
        return new InvalidRequestError(rawError);
      case 'api_error':
        return new APIError(rawError);
      case 'authentication_error':
        return new AuthenticationError(rawError);
      case 'rate_limit_error':
        return new RateLimitError(rawError);
      case 'idempotency_error':
        return new IdempotencyError(rawError);
      case 404:
        return new NotFoundError(rawError);
      case 422:
        return new UserInputError(rawError);
    }
  }

  return new UnknownError(rawError);
}

type ErrorConfig = {
  name: string;
  type?: string;
  code?: string;
  docs_url?: string;
  help_link?: string;
  status?: number;
  statusText?: string;
  responseBody?: unknown;
  message: string;
  suggestion?: string;
  stack?: string;
};

/**
 * BaseError is the base error from which all other more specific errors derive.
 * Specifically for errors returned from REST API.
 */
export class MagicBellError extends Error {
  /**
   * The name of the error.
   */
  name: string;
  /**
   * The error message returned by the REST API.
   */
  message: string;
  /**
   * The type of the error.
   */
  type?: string;
  /**
   * The URL to the documentation for the error.
   */
  docsUrl?: string;
  /**
   * The error code returned by the REST API.
   */
  code?: string;
  /**
   * The HTTP status code returned by the REST API.
   */
  status?: number;
  /**
   * The HTTP status text returned by the REST API.
   */
  statusText?: string;
  /**
   * A suggestion on how to fix the error.
   */
  suggestion?: string;
  /**
   * The raw response body returned by the REST API.
   */
  responseBody?: unknown;

  /**
   * @deprecated - use docsUrl instead
   */
  get docs_url() {
    return this.docsUrl;
  }

  constructor(raw: ErrorConfig) {
    super(raw.message);
    this.type = this.constructor.name;
    this.name = 'MagicBellError';
    this.code = raw.code;
    this.status = raw.status;
    this.statusText = raw.statusText;
    this.responseBody = raw.responseBody;
    this.message = raw.message;
    this.suggestion = raw.suggestion;
    this.docsUrl = raw.docs_url || raw.help_link;
    this.stack = raw.stack;
  }
}

export class InvalidRequestError extends MagicBellError {}
export class UserInputError extends MagicBellError {}
export class APIError extends MagicBellError {}
export class AuthenticationError extends MagicBellError {}
export class PermissionError extends MagicBellError {}
export class RateLimitError extends MagicBellError {}
export class ConnectionError extends MagicBellError {}
export class IdempotencyError extends MagicBellError {}
export class UnknownError extends MagicBellError {}
export class NotFoundError extends MagicBellError {}
