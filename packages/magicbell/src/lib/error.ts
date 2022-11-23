'use strict';

// TODO: sync & cleanup
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
  message: string;
  suggestion?: string;
};

/**
 * BaseError is the base error from which all other more specific errors derive.
 * Specifically for errors returned from REST API.
 */
class BaseError extends Error {
  name: string;
  message: string;
  type?: string;
  docs_url?: string;
  code?: string;
  status?: number;
  statusText?: string;
  suggestion?: string;

  constructor(raw: ErrorConfig) {
    super(raw.message);
    this.type = this.constructor.name;
    this.name = 'MagicBellError';
    this.code = raw.code;
    this.status = raw.status;
    this.statusText = raw.statusText;
    this.message = raw.message;
    this.suggestion = raw.suggestion;
    this.docs_url = raw.docs_url || raw.help_link;
  }
}

export class InvalidRequestError extends BaseError {}
export class UserInputError extends BaseError {}
export class APIError extends BaseError {}
export class AuthenticationError extends BaseError {}
export class PermissionError extends BaseError {}
export class RateLimitError extends BaseError {}
export class ConnectionError extends BaseError {}
export class IdempotencyError extends BaseError {}
export class UnknownError extends BaseError {}
export class NotFoundError extends BaseError {}
