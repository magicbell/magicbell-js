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
      // Catching and not rethrowing error is expected and tested.
      // eslint-disable-next-line no-console
      console.warn('"customAttributes" is not valid JSON');
    }
  }

  return obj;
}
