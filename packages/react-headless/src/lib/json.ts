import { isNil } from 'ramda';

/**
 * Function to parse an object.
 *
 * @param obj
 * @returns
 */
export function parseJSON(obj: Record<string, unknown> | string | null) {
  if (isNil(obj)) return null;
  if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch (e) {
      // intentionally left blank
    }
  }

  return obj;
}
