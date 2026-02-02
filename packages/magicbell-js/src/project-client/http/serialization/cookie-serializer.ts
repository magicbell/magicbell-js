import { RequestParameter } from '../transport/types.js';
import { SerializationStyle } from './base-serializer.js';

/**
 * Serializer for HTTP cookies.
 * Converts cookie parameters into a cookie object for requests.
 */
export class CookieSerializer {
  /**
   * Serializes cookie parameters into a cookie object.
   * @param cookieParams - Map of cookie names to their parameter values
   * @returns A record of cookie names to serialized values, or undefined if no cookies
   */
  public serialize(cookieParams: Map<string, RequestParameter> | undefined): Record<string, string> | undefined {
    if (!cookieParams || !cookieParams.size) {
      return undefined;
    }

    const cookies: Record<string, string> = {};
    cookieParams.forEach((param) => {
      if (!param.key || param.value === undefined) {
        return;
      }
      cookies[param.key] = this.serializeCookieValue(param);
    });
    return cookies;
  }

  /**
   * Serializes a single cookie value based on its type.
   * @param param - The cookie parameter to serialize
   * @returns The serialized cookie value string
   */
  private serializeCookieValue(param: RequestParameter): string {
    if (Array.isArray(param.value)) {
      return this.serializeArray(param.value, param);
    }

    if (this.isNonNullObject(param.value)) {
      return this.serializeObject(param.value, param);
    }

    return this.serializePrimitive(param.value);
  }

  /**
   * Serializes a primitive cookie value.
   * @param value - The primitive value to serialize
   * @returns The string representation of the value
   */
  private serializePrimitive(value: unknown): string {
    return `${value}`;
  }

  /**
   * Serializes an array cookie value.
   * @param value - The array to serialize
   * @param param - The cookie parameter configuration
   * @returns The serialized array string
   */
  private serializeArray(value: unknown[], param: RequestParameter): string {
    if (param.explode) {
      if (value.length === 0) return '';
      const first = value[0];
      const rest = value
        .slice(1)
        .map((v) => `${param.key}=${v}`)
        .join('; ');
      return rest ? `${first}; ${rest}` : `${first}`;
    }

    return value.join(',');
  }

  /**
   * Serializes an object cookie value as JSON.
   * @param obj - The object to serialize
   * @param param - The cookie parameter configuration
   * @returns The JSON string representation of the object
   */
  private serializeObject(obj: object, param: RequestParameter): string {
    return JSON.stringify(obj);
  }

  /**
   * Type guard to check if a value is a non-null object.
   * @param value - The value to check
   * @returns True if the value is an object and not null
   */
  private isNonNullObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
  }
}
