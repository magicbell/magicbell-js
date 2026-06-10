import { HttpError } from '../error.js';
import { Request } from '../transport/request.js';
import { RequestFetchAdapter } from '../transport/request-fetch-adapter.js';
import { HttpResponse, RequestHandler } from '../types.js';

/**
 * Final handler in the request chain that executes the actual HTTP request.
 * Uses the configured HTTP client adapter (Fetch or Axios) to send the request.
 */
export class TerminatingHandler implements RequestHandler {
  /**
   * Executes the actual HTTP request using the configured client adapter.
   * @template T - The expected response data type
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the HTTP response
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    return new RequestFetchAdapter<T>(request).send();
  }

  /**
   * Executes a streaming HTTP request using the configured client adapter.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to execute
   * @returns An async generator that yields HTTP responses
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    yield* new RequestFetchAdapter<T>(request).stream();
  }
}
