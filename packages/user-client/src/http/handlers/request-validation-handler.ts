import { Request } from '../transport/request.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';

export class RequestValidationHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    this.validateRequest(request);

    return this.next.handle<T>(request);
  }

  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    this.validateRequest(request);

    yield* this.next.stream<T>(request);
  }

  validateRequest(request: Request): void {
    if (request.requestContentType === ContentType.Json) {
      request.body = JSON.stringify(request.requestSchema?.parse(request.body));
    } else if (
      request.requestContentType === ContentType.Xml ||
      request.requestContentType === ContentType.Text ||
      request.requestContentType === ContentType.Image ||
      request.requestContentType === ContentType.Binary
    ) {
      request.body = request.body;
    } else if (request.requestContentType === ContentType.FormUrlEncoded) {
      request.body = this.toFormUrlEncoded(request);
    } else if (request.requestContentType === ContentType.MultipartFormData) {
      request.body = this.toFormData(request.body);
    } else {
      request.body = JSON.stringify(request.requestSchema?.parse(request.body));
    }
  }

  toFormUrlEncoded(request: Request): string {
    if (request.body === undefined) {
      return '';
    }

    if (typeof request.body === 'string') {
      return request.body;
    }

    if (request.body instanceof URLSearchParams) {
      return request.body.toString();
    }

    const validatedBody = request.requestSchema?.parse(request.body);

    if (validatedBody instanceof FormData) {
      const params = new URLSearchParams();
      validatedBody.forEach((value, key) => {
        if (value != null) {
          params.append(key, value.toString());
        }
      });
      return params.toString();
    }

    if (typeof validatedBody === 'object' && !Array.isArray(validatedBody)) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(validatedBody)) {
        if (value != null) {
          params.append(key, `${value}`);
        }
      }
      return params.toString();
    }

    return '';
  }

  toFormData(body: Record<string, any>): FormData | undefined {
    const formData = new FormData();

    Object.keys(body).forEach((key: any) => {
      const value: any = body[key];
      if (Array.isArray(value)) {
        value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
      } else if (value instanceof ArrayBuffer) {
        formData.append(key, new Blob([value]));
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }
}
