import { ResponseDefinition } from '../transport/request.js';
import { ContentType, HttpResponse } from '../types.js';

export class ResponseMatcher {
  constructor(private responses: ResponseDefinition[]) {}

  public getResponseDefinition(response: HttpResponse): ResponseDefinition | undefined {
    const rawContentType = response.metadata.headers['content-type']?.toLocaleLowerCase() || '';
    const contentType = this.getContentTypeDefinition(rawContentType);
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

  private getContentTypeDefinition(contentType: string): ContentType {
    if (contentType.startsWith('application/') && contentType.includes('xml')) {
      return ContentType.Xml;
    }

    if (contentType.toLowerCase() === 'application/x-www-form-urlencoded') {
      return ContentType.FormUrlEncoded;
    }

    if (contentType.toLowerCase() === 'text/event-stream') {
      return ContentType.EventStream;
    }

    if (contentType.toLowerCase().startsWith('text/')) {
      return ContentType.Text;
    }

    if (contentType.toLowerCase().startsWith('image/')) {
      return ContentType.Image;
    }

    if (contentType.toLowerCase() === 'application/octet-stream') {
      return ContentType.Binary;
    }

    if (contentType.toLowerCase() === 'application/json') {
      return ContentType.Json;
    }

    return ContentType.Json;
  }
}
