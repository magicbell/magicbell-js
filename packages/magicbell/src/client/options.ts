import type { Hooks } from 'ky';

import { hasOwn, isBoolean, isNumber, isObject, isString, joinAnd, joinOr } from '../lib/utils';
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
  features: isObject,
  headers: isObject,
  hooks: isObject,
};

export function isOptionsHash(object) {
  if (!isObject(object)) return false;

  for (const key of Object.keys(object)) {
    if (!optionValidators[key]?.(object[key])) return false;
  }

  return true;
}

export function assertHasValidOptions<T extends ClientOptions>(options: T) {
  const invalidOptions = Object.keys(options).filter((x) => !optionValidators[x]?.(options[x]));
  if (invalidOptions.length) {
    throw new Error(
      `You have provided invalid client options. Please check the options ${joinAnd(...invalidOptions)}.`,
    );
  }
}

export function assertHasRequiredOptions<T extends ClientOptions, K extends keyof ClientOptions>(
  options: T,
  required: K[],
) {
  const missingOptions = required.filter((x) => !hasOwn(options, x) || options[x] == null || options[x] === '');
  if (missingOptions.length) {
    throw new Error(`You have not provided all required client options. Please provide ${joinAnd(...missingOptions)}.`);
  }
}

export function assertHasSomeOptions<T extends ClientOptions, K extends keyof ClientOptions>(options: T, keys: K[]) {
  const missingOptions = keys.filter((x) => !hasOwn(options, x) || options[x] == null || options[x] === '');
  if (missingOptions.length === keys.length) {
    throw new Error(`You have not provided any of the required client options. Please provide ${joinOr(...keys)}.`);
  }
}

export function mergeHooks(...hooks: Hooks[]): Hooks {
  const result = {} as Hooks;

  for (const hook of hooks) {
    for (const key of Object.keys(hook || {})) {
      result[key] ??= [];
      result[key].push(...hook[key]);
    }
  }

  return result;
}
