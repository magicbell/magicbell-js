import { RequestParameter } from '../transport/types.js';
import { Serializer } from './base-serializer.js';

export class HeaderSerializer extends Serializer {
  public serialize(headerParams: Map<string, RequestParameter> | undefined): HeadersInit | undefined {
    if (!headerParams || !headerParams.size) {
      return undefined;
    }

    const headers: HeadersInit = {};
    headerParams.forEach((param) => {
      if (!param.key) {
        return;
      }
      headers[param.key] = this.serializeValue(param);
    });
    return headers;
  }
}
