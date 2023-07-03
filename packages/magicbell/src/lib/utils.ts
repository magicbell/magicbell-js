import type { Hooks } from 'ky';

export const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);

export function isString(value) {
  return typeof value === 'string';
}

export function isBoolean(value) {
  return typeof value === 'boolean';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isStringArray(value) {
  return Array.isArray(value) && value.every((x) => typeof x === 'string');
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isObject(value) {
  return value && typeof value === 'object';
}

export function compact(obj: Record<string, unknown>, dropEmptyString = false) {
  if (typeof obj !== 'object') {
    throw new Error('Argument must be an object');
  }

  const result = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] == null) continue;
    if (dropEmptyString && obj[key] === '') continue;
    result[key] = obj[key];
  }

  return result;
}

export function uuid4() {
  // TODO: should be upgradable to crypto.randomUUID(), introduced by node v14
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function joinAnd(...parts) {
  if (parts.length <= 2) return parts.join(' and ');

  const last = parts.slice(-1)[0];
  const others = parts.slice(0, -1);
  return [others.join(', '), last].join(', and ');
}

export function joinOr(...parts) {
  if (parts.length <= 2) return parts.join(' or ');

  const last = parts.slice(-1)[0];
  const others = parts.slice(0, -1);
  return [others.join(', '), last].join(', or ');
}

export function joinUrlSegments(...segments) {
  return ['/', ...segments].join('/').replace(/\/+/g, '/').replace(/\/$/, '');
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

export function tryParse(obj: unknown) {
  try {
    return JSON.parse(String(obj));
  } catch {
    return obj;
  }
}
