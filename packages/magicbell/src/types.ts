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
};

export type RequestOptions = Pick<
  ClientOptions,
  'userEmail' | 'userExternalId' | 'userHmac' | 'idempotencyKey' | 'timeout' | 'maxRetries' | 'maxRetryDelay'
>;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestArgs = {
  method: RequestMethod;
  path: string;
  data?: Record<string, unknown>;
  params?: Record<string, string>;
};
