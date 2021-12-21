import isNil from 'ramda/src/isNil';

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
      console.warn('"customAttributes" is not valid JSON');
    }
  }

  return obj;
}
