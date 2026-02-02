import { ResponseDefinition } from '../transport/types.js';
import { ContentType, HttpResponse } from '../types.js';
import { getContentTypeDefinition } from './content-type.js';

/**
 * Matches HTTP responses to their expected response definitions.
 * Determines which response schema to use based on status code and content type.
 */
export class ResponseMatcher {
  /**
   * Creates a new response matcher.
   * @param responses - Array of possible response definitions for an endpoint
   */
  constructor(private responses: ResponseDefinition[]) {}

  /**
   * Finds the matching response definition for an HTTP response.
   * Matches based on status code and content type from the response headers.
   * @param response - The HTTP response to match
   * @returns The matching response definition, or undefined if no match found
   */
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
