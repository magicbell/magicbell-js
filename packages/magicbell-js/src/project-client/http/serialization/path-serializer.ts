import { RequestParameter } from '../transport/types.js';
import { Serializer } from './base-serializer.js';

/**
 * Serializer for path parameters in URL templates.
 * Replaces path template placeholders with serialized parameter values.
 */
export class PathSerializer extends Serializer {
  /**
   * Serializes path parameters into a URL path by replacing template placeholders.
   * @param pathPattern - The URL path pattern with {placeholders}
   * @param pathArguments - Map of parameter names to their values
   * @returns The path with placeholders replaced by serialized values
   * @example
   * serialize("/users/{id}", Map([["id", {key: "id", value: 123}]])) returns "/users/123"
   */
  public serialize(pathPattern: string, pathArguments: Map<string, RequestParameter>): string {
    let serializedPath = pathPattern;
    pathArguments.forEach((param: RequestParameter) => {
      serializedPath = serializedPath.replace(`{${param.key}}`, `${this.serializeValue(param)}`);
    });
    return serializedPath;
  }
}
