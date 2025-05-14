import { ResponseDefinition } from '../transport/types.js';
import { ContentType, HttpResponse } from '../types.js';
import { getContentTypeDefinition } from './content-type.js';

export class ResponseMatcher {
  constructor(private responses: ResponseDefinition[]) {}

  public getResponseDefinition(response: HttpResponse): ResponseDefinition | undefined {
    const rawContentType = response.metadata.headers['content-type']?.toLocaleLowerCase() || '';
    const contentType = getContentTypeDefinition(rawContentType);
    const statusCode = response.metadata.status;

    if (!this.responses.length) {
      return;
    }

    if (this.responses.length === 1) {
      return this.responses[0];
    }

    return this.responses.find((response) => {
      return response.contentType === contentType && response.status === statusCode;
    });
  }
}
