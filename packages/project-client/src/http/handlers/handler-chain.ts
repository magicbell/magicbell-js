import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class RequestHandlerChain {
  private readonly handlers: RequestHandler[] = [];

  addHandler(handler: RequestHandler): void {
    if (this.handlers.length > 0) {
      const previousHandler = this.handlers[this.handlers.length - 1];
      previousHandler.next = handler;
    }
    this.handlers.push(handler);
  }

  async callChain<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.handlers.length) {
      throw new Error('No handlers added to the chain');
    }

    return this.handlers[0].handle<T>(request);
  }

  async *streamChain<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.handlers.length) {
      throw new Error('No handlers added to the chain');
    }

    yield* this.handlers[0].stream<T>(request);
  }
}
