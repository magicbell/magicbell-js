import { isBoolean, isNumber, isObject, isString } from './lib/utils';
import { ClientOptions } from './types';

const optionValidators: Record<keyof ClientOptions, (value: unknown) => boolean> = {
  host: isString,
  maxRetryDelay: isNumber,
  timeout: isNumber,
  apiKey: isString,
  maxRetries: isNumber,
  userEmail: isString,
  userExternalId: isString,
  userHmac: isString,
  idempotencyKey: isString,
  telemetry: isBoolean,
  apiSecret: isString,
  appInfo: isObject,
  debug: isBoolean,
};

export function isOptionsHash(object) {
  if (!isObject(object)) return false;

  for (const key of Object.keys(object)) {
    if (!optionValidators[key]?.(object[key])) return false;
  }

  return true;
}
