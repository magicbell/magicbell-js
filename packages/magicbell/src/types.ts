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
  features?: {
    'broadcasts-get'?: true;
    'broadcasts-list'?: true;
    'broadcasts-notifications-list'?: true;
    'imports-create'?: true;
    'imports-get'?: true;
    'users-push-subscriptions-delete'?: true;
    'users-push-subscriptions-list'?: true;
  };
  headers?: Record<string, string>;
};

export type FeatureFlag = keyof ClientOptions['features'];

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
