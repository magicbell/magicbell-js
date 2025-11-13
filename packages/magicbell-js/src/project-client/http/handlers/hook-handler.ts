import { HttpError } from '../error.js';
import { ThrowableError } from '../errors/throwable-error.js';
import { Hook } from '../hooks/hook.js';
import { Request } from '../transport/request.js';
import { TransportHookAdapter } from '../transport/transport-hook-adapter.js';
import { ErrorDefinition } from '../transport/types.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';
import { getContentTypeDefinition } from '../utils/content-type.js';

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

    // Handle error responses
    const arrayBuffer = response.raw;

    const rawContentType = response.metadata.headers['content-type']?.toLocaleLowerCase() || '';
    const contentType = getContentTypeDefinition(rawContentType);
    const statusCode = response.metadata.status;

    const error = request.errors.find((error): error is ErrorDefinition => {
      return error.contentType === contentType && error.status === statusCode;
    });

    if (error) {
      const decodedBody = new TextDecoder().decode(arrayBuffer);
      const json = JSON.parse(decodedBody);
      new error.error((json as any)?.message || '', json).throw();
    }

    const decodedBody = new TextDecoder().decode(arrayBuffer);
    throw new HttpError(
      response.metadata,
      arrayBuffer,
      `Unexpected response body for error status.\nStatusCode: ${response.metadata.status}\nBody: ${decodedBody}`,
    );
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
