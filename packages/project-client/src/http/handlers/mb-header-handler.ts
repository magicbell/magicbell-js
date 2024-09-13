import { SerializationStyle } from '../serialization/base-serializer.js';
import { Request } from '../transport/request.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class HeaderHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error(`No next handler set in ${HeaderHandler.name}`);
    }

    const requestWithHeaders = this.addHeaders(request);
    return this.next?.handle(requestWithHeaders);
  }

  private addHeaders<T>(request: Request<T>): Request<T> {
    const { headers } = request.config as any;
    if (typeof headers !== 'object') {
      return request;
    }

    for (const [key, value] of Object.entries(headers)) {
      request.addHeaderParam(key, {
        key: key,
        value: value,
        explode: false,
        encode: false,
        style: SerializationStyle.SIMPLE,
        isLimit: false,
        isOffset: false,
      });
    }

    return request;
  }
}
