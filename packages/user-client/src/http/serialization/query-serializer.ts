import { RequestParameter } from '../transport/request.js';
import { Serializer } from './base-serializer.js';

export class QuerySerializer extends Serializer {
  public serialize(queryParams: Map<string, RequestParameter>): string {
    if (!queryParams || !queryParams.size) {
      return '';
    }

    const query: string[] = [];

    queryParams.forEach((param) => {
      return query.push(`${this.serializeValue(param)}`);
    });

    return query.length ? `?${query.join('&')}` : '';
  }
}
