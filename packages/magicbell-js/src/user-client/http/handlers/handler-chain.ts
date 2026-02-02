import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

/**
 * Chain of Responsibility pattern implementation for request handlers.
 * Manages a linked chain of handlers that process HTTP requests sequentially.
 */
export class RequestHandlerChain {
  /** Array of handlers in the chain */
  private readonly handlers: RequestHandler[] = [];

  /**
   * Adds a handler to the end of the chain.
   * Links the new handler to the previous one in the chain.
   * @param handler - The request handler to add
   */
  addHandler(handler: RequestHandler): void {
    if (this.handlers.length > 0) {
      const previousHandler = this.handlers[this.handlers.length - 1];
      previousHandler.next = handler;
    }
    this.handlers.push(handler);
  }

  /**
   * Executes the handler chain for a standard request.
   * @template T - The expected response data type
   * @param request - The HTTP request to process
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no handlers are added to the chain
   */
  async callChain<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.handlers.length) {
      throw new Error('No handlers added to the chain');
    }

    return this.handlers[0].handle<T>(request);
  }

  /**
   * Executes the handler chain for a streaming request.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to process
   * @returns An async generator that yields HTTP responses
   * @throws Error if no handlers are added to the chain
   */
  async *streamChain<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.handlers.length) {
      throw new Error('No handlers added to the chain');
    }

    yield* this.handlers[0].stream<T>(request);
  }
}
