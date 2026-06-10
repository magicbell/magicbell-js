import { HttpError } from '../error.js';
import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

/**
 * Request handler that automatically retries failed requests.
 * Retries are triggered for server errors (5xx), timeouts (408), and rate limits (429).
 */
export class RetryHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request with retry logic.
   * Retries failed requests based on the configured retry settings.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set, or if all retry attempts fail
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in retry handler.');
    }

    for (let attempt = 1; attempt <= request.retry.attempts; attempt++) {
      try {
        return await this.next.handle<T>(request);
      } catch (error: any) {
        if (!this.shouldRetry(error) || attempt === request.retry.attempts) {
          throw error;
        }
        await this.delay(request.retry.delayMs);
      }
    }

    throw new Error('Error retrying request.');
  }

  /**
   * Handles a streaming HTTP request with retry logic.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set, or if all retry attempts fail
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in retry handler.');
    }

    for (let attempt = 1; attempt <= request.retry.attempts; attempt++) {
      try {
        yield* this.next.stream<T>(request);
        return;
      } catch (error: any) {
        if (!this.shouldRetry(error) || attempt === request.retry.attempts) {
          throw error;
        }
        await this.delay(request.retry.delayMs);
      }
    }

    throw new Error('Error retrying request.');
  }

  /**
   * Determines if an error should trigger a retry.
   * Retries server errors (5xx), request timeouts (408), and rate limits (429).
   * @param error - The error to check
   * @returns True if the request should be retried, false otherwise
   */
  private shouldRetry(error: Error): boolean {
    return (
      error instanceof HttpError &&
      (error.metadata.status >= 500 || error.metadata.status === 408 || error.metadata.status === 429)
    );
  }

  /**
   * Delays execution for a specified duration before retrying.
   * @param delayMs - The delay in milliseconds (optional)
   * @returns A promise that resolves after the delay
   */
  private delay(delayMs: number | undefined): Promise<void> {
    if (!delayMs) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), delayMs);
    });
  }
}
