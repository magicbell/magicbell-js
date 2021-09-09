import { isNil } from 'ramda';

/**
 * Function to parse an object.
 *
 * @param obj
 * @returns
 */
export function parseJSON(obj: Object | string | null) {
  if (isNil(obj)) return null;
  if (typeof obj === 'string') {
    try {
      return JSON.parse(obj);
    } catch (e) {
      console.warn('"customAttributes" is not valid JSON');
    }
  }

  return obj;
}
