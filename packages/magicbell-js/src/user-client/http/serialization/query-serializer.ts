import { RequestParameter } from '../transport/types.js';
import { SerializationOptions, Serializer } from './base-serializer.js';

/**
 * Serializer for URL query string parameters.
 * Converts query parameters into a URL query string.
 */
export class QuerySerializer extends Serializer {
  /**
   * Serializes query parameters into a URL query string.
   * @param queryParams - Map of query parameter names to their values
   * @returns A query string starting with "?" if parameters exist, empty string otherwise
   * @example
   * serialize(Map([["name", {...}], ["age", {...}]])) returns "?name=John&age=30"
   */
  public serialize(queryParams: Map<string, RequestParameter>): string {
    if (!queryParams || !queryParams.size) {
      return '';
    }

    const query: string[] = [];

    queryParams.forEach((param) => {
      // Skip parameters with undefined values
      if (param.value === undefined) {
        return;
      }

      return query.push(`${this.serializeValue(param)}`);
    });

    return query.length ? `?${query.join('&')}` : '';
  }
}
