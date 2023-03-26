export type ClientOptions = {
  host?: string;
  apiKey: string;
  apiSecret?: string;
  userEmail?: string;
  userExternalId?: string;
  userHmac?: string;
  appInfo?: {
    name: string;
    version?: string;
    url?: string;
  };
  timeout?: number;
  maxRetries?: number;
  maxRetryDelay?: number;
  idempotencyKey?: string;
  telemetry?: boolean;
  debug?: boolean;
  features?: Record<string, boolean>;
  headers?: Record<string, string>;
};

export type RequestOptions = {
  userEmail?: string;
  userExternalId?: string;
  userHmac?: string;
  idempotencyKey?: string;
  timeout?: number;
  maxRetries?: number;
  maxRetryDelay?: number;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestArgs = {
  method: RequestMethod;
  path: string;
  data?: Record<string, unknown>;
  params?: Record<string, string>;
};
