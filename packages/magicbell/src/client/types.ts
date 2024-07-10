import type { Hooks } from 'ky';

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type ClientOptions = {
  host?: string;
  token?: string;
  apiKey?: string;
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
  features?: Record<string, never>;
  headers?: Record<string, string>;
  hooks?: Hooks;
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
  headers?: Record<string, string>;
};
