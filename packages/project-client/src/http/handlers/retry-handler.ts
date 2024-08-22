import { HttpError } from '../error';
import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';

export class RetryHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in retry handler.');
    }

    for (let attempt = 1; attempt <= request.retry.attempts; attempt++) {
      try {
        return await this.next.handle(request);
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
    return error instanceof HttpError && (error.metadata.status >= 500 || error.metadata.status === 408);
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
