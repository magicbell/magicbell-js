import { RequestParameter } from '../transport/types.js';

/**
 * Options for parameter serialization.
 */
export type SerializationOptions = {
  /** Whether to use exploded parameter format */
  explode: boolean;
  /** The serialization style to use */
  style: SerializationStyle;
  /** Whether to URL-encode the parameter */
  encode: boolean;
};

/**
 * OpenAPI parameter serialization styles.
 * Defines how parameters should be formatted in the request.
 */
export enum SerializationStyle {
  /** Simple comma-separated values (e.g., "3,4,5") */
  SIMPLE = 'simple',
  /** Label prefix with dot notation (e.g., ".3.4.5") */
  LABEL = 'label',
  /** Matrix semicolon-prefixed (e.g., ";id=3;id=4") */
  MATRIX = 'matrix',
  /** Form-style ampersand-separated (e.g., "id=3&id=4") */
  FORM = 'form',
  /** Space-delimited values (e.g., "id=3 4 5") */
  SPACE_DELIMITED = 'space_delimited',
  /** Pipe-delimited values (e.g., "id=3|4|5") */
  PIPE_DELIMITED = 'pipe_delimited',
  /** Deep object notation (e.g., "id[role]=admin") */
  DEEP_OBJECT = 'deep_object',
  /** No specific style applied */
  NONE = 'none',
}

/**
 * Base serializer class for converting request parameters to string format.
 * Supports multiple OpenAPI serialization styles for primitives, arrays, and objects.
 */
export class Serializer {
  /**
   * Serializes a parameter value based on its type and serialization style.
   * @param param - The request parameter to serialize
   * @returns The serialized string representation
   */
  protected serializeValue(param: RequestParameter): string {
    if (Array.isArray(param.value)) {
      return this.serializeArray(param.value, param);
    }

    if (this.isNonNullObject(param.value)) {
      return this.serializeObject(param.value, param);
    }

    return this.serializePrimitive(param);
  }

  /**
   * Serializes a primitive value (string, number, boolean).
   * @param param - The request parameter containing the primitive value
   * @returns The serialized primitive string
   */
  private serializePrimitive(param: RequestParameter): string {
    if (param.style === SerializationStyle.LABEL) {
      return `.${param.value}`;
    } else if (param.style === SerializationStyle.MATRIX) {
      return `;${param.key}=${param.value}`;
    } else if (param.style === SerializationStyle.FORM) {
      return `${encodeURIComponent(param.key || '')}=${encodeURIComponent(`${param.value}`)}`;
    }

    return `${param.value}`;
  }

  /**
   * Serializes an array value according to the specified style.
   * @param value - The array to serialize
   * @param param - The request parameter configuration
   * @returns The serialized array string
   */
  private serializeArray(value: unknown[], param: RequestParameter): string {
    if (param.explode) {
      this.serializeArrayExploded(value, param);
      return this.serializeArrayExploded(value, param);
    }

    if (param.style === SerializationStyle.SIMPLE) {
      return `${value.join(',')}`;
    } else if (param.style === SerializationStyle.LABEL) {
      return `.${value.join(',')}`;
    } else if (param.style === SerializationStyle.MATRIX) {
      return `;${param.key}=${value.join(',')}`;
    } else if (param.style === SerializationStyle.FORM) {
      return `${encodeURIComponent(param.key || '')}=${encodeURIComponent(value.join(','))}`;
    } else if (param.style === SerializationStyle.SPACE_DELIMITED) {
      return `${param.key}=${value.join(' ')}`;
    } else if (param.style === SerializationStyle.PIPE_DELIMITED) {
      return `${param.key}=${value.join('|')}`;
    }

    return `${value.join(',')}`;
  }

  /**
   * Serializes an array in exploded format where each value is a separate parameter.
   * @param value - The array to serialize
   * @param param - The request parameter configuration
   * @returns The serialized exploded array string
   */
  private serializeArrayExploded(value: unknown[], param: RequestParameter): string {
    if (param.style === SerializationStyle.SIMPLE) {
      return value.map((val) => `${val}`).join(',');
    } else if (param.style === SerializationStyle.LABEL) {
      return value.map((val) => `.${val}`).join('');
    } else if (param.style === SerializationStyle.MATRIX) {
      return value.map((val) => `;${param.key}=${val}`).join('');
    } else if (
      param.style === SerializationStyle.FORM ||
      param.style === SerializationStyle.SPACE_DELIMITED ||
      param.style === SerializationStyle.PIPE_DELIMITED
    ) {
      return value.map((val) => `${encodeURIComponent(param.key || '')}=${encodeURIComponent(`${val}`)}`).join('&');
    }

    return `${value.join(',')}`;
  }

  /**
   * Serializes an object value according to the specified style.
   * @param obj - The object to serialize
   * @param param - The request parameter configuration
   * @returns The serialized object string
   */
  private serializeObject(obj: object, param: RequestParameter): string {
    if (param.explode) {
      if (param.style === SerializationStyle.SIMPLE) {
        return Object.entries(obj)
          .map(([key, val]) => `${key}=${val}`)
          .join(',');
      } else if (param.style === SerializationStyle.LABEL) {
        return Object.entries(obj)
          .map(([key, val]) => `.${key}=${val}`)
          .join('');
      } else if (param.style === SerializationStyle.MATRIX) {
        return Object.entries(obj)
          .map(([key, val]) => `;${key}=${val}`)
          .join('');
      } else if (param.style === SerializationStyle.FORM) {
        return Object.entries(obj)
          .map(([key, val]) => `${key}=${val}`)
          .join('&');
      }
    }

    if (param.style === SerializationStyle.SIMPLE) {
      return Object.entries(obj)
        .map(([key, val]) => `${key},${val}`)
        .join(',');
    } else if (param.style === SerializationStyle.LABEL) {
      return `.${Object.entries(obj)
        .map(([key, val]) => `${key},${val}`)
        .join(',')}`;
    } else if (param.style === SerializationStyle.MATRIX) {
      return `;${param.key}=${Object.entries(obj)
        .map(([key, val]) => `${key},${val}`)
        .join(',')}`;
    } else if (param.style === SerializationStyle.FORM) {
      return Object.entries(obj)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    } else if (param.style === SerializationStyle.DEEP_OBJECT) {
      return Object.entries(obj)
        .map(([key, val]) => {
          return `${param.key}[${key}]=${val}`;
        })
        .join('&');
    }

    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
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
