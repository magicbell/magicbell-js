import { RequestParameter } from '../transport/types.js';
import { SerializationOptions, Serializer } from './base-serializer.js';

export class QuerySerializer extends Serializer {
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
