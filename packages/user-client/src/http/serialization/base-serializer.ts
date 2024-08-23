import { RequestParameter } from '../transport/request';

export type SerializationOptions = {
  explode: boolean;
  style: SerializationStyle;
  encode: boolean;
};

export enum SerializationStyle {
  SIMPLE = 'simple',
  LABEL = 'label',
  MATRIX = 'matrix',
  FORM = 'form',
  SPACE_DELIMITED = 'space_delimited',
  PIPE_DELIMITED = 'pipe_delimited',
  DEEP_OBJECT = 'deep_object',
  NONE = 'none',
}

export class Serializer {
  protected serializeValue(param: RequestParameter): string {
    if (Array.isArray(param.value)) {
      return this.serializeArray(param.value, param);
    }

    if (this.isNonNullObject(param.value)) {
      return this.serializeObject(param.value, param);
    }

    return this.serializePrimitive(param);
  }

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

  private isNonNullObject(value: unknown): value is object {
    return typeof value === 'object' && value !== null;
  }
}
