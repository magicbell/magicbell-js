import { HttpError } from '../error';
import { Hook } from '../hooks/hook';
import { Request } from '../transport/request';
import { TransportHookAdapter } from '../transport/transport-hook-adapter';
import { HttpResponse, RequestHandler } from '../types';

export class HookHandler implements RequestHandler {
  next?: RequestHandler;

  constructor(private readonly hook: Hook) {}

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hook = new TransportHookAdapter<T>();

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = await hook.beforeRequest(request, hookParams);

    const response = await this.next.handle(nextRequest);

    if (response.metadata.status < 400) {
      return await hook.afterResponse(nextRequest, response, hookParams);
    }

    const error = await hook.onError(nextRequest, response, hookParams);

    throw new HttpError(error.metadata, error.error);
  }

  private getHookParams<T>(_request: Request<T>): Map<string, string> {
    const hookParams: Map<string, string> = new Map();
    return hookParams;
  }
}
