import { Hook } from '../hooks/hook.js';
import { Request } from '../transport/request.js';
import { TransportHookAdapter } from '../transport/transport-hook-adapter.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class HookHandler implements RequestHandler {
  next?: RequestHandler;

  constructor(private readonly hook: Hook) {}

  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hook = new TransportHookAdapter<T>();

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = await hook.beforeRequest(request, hookParams);

    const response = await this.next.handle<T>(nextRequest);

    if (response.metadata.status < 400) {
      return await hook.afterResponse(nextRequest, response, hookParams);
    }

    throw await hook.onError(nextRequest, response, hookParams);
  }

  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hook = new TransportHookAdapter<T>();

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = await hook.beforeRequest(request, hookParams);

    const stream = this.next.stream<T>(nextRequest);

    for await (const response of stream) {
      if (response.metadata.status < 400) {
        yield await hook.afterResponse(nextRequest, response, hookParams);
      } else {
        throw await hook.onError(nextRequest, response, hookParams);
      }
    }
  }

  private getHookParams<T>(_request: Request): Map<string, string> {
    const hookParams: Map<string, string> = new Map();
    return hookParams;
  }
}
