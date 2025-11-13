import { HttpError } from '../error.js';
import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class RetryHandler implements RequestHandler {
  next?: RequestHandler;

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

  private shouldRetry(error: Error): boolean {
    return (
      error instanceof HttpError &&
      (error.metadata.status >= 500 || error.metadata.status === 408 || error.metadata.status === 429)
    );
  }

  private delay(delayMs: number | undefined): Promise<void> {
    if (!delayMs) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), delayMs);
    });
  }
}
