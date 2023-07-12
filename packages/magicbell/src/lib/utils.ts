export const hasOwn = (obj, prop) => obj && Object.prototype.hasOwnProperty.call(obj, prop);

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

export function tryParse(obj: unknown) {
  try {
    return JSON.parse(String(obj));
  } catch {
    return obj;
  }
}
