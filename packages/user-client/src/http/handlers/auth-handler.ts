import { SerializationStyle } from '../serialization/base-serializer.js';
import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class AuthHandler implements RequestHandler {
  next?: RequestHandler;

  public async handle<T>(request: Request): Promise<HttpResponse<T>> {
    const requestWithAuth = this.addAccessTokenHeader(request);

    if (!this.next) {
      throw new Error(`No next handler set in ${AuthHandler.name}`);
    }

    return this.next.handle<T>(requestWithAuth);
  }

  public async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    const requestWithAuth = this.addAccessTokenHeader(request);

    if (!this.next) {
      throw new Error(`No next handler set in ${AuthHandler.name}`);
    }

    yield* this.next.stream<T>(requestWithAuth);
  }

  private addAccessTokenHeader(request: Request): Request {
    const { token } = request.config;
    if (!token) {
      return request;
    }

    request.addHeaderParam('Authorization', {
      key: 'Authorization',
      value: `Bearer ${token}`,
      explode: false,
      encode: false,
      style: SerializationStyle.SIMPLE,
      isLimit: false,
      isOffset: false,
    });

    return request;
  }
}
