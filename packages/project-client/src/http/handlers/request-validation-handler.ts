import { Request } from '../transport/request.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';

export class RequestValidationHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    if (request.requestContentType === ContentType.Json) {
      request.body = JSON.stringify(request.requestSchema?.parse(request.body));
    } else if (
      request.requestContentType === ContentType.Xml ||
      request.requestContentType === ContentType.Binary ||
      request.requestContentType === ContentType.Text
    ) {
      request.body = request.body;
    } else if (request.requestContentType === ContentType.FormUrlEncoded) {
      request.body = this.toFormUrlEncoded(request.body);
    } else if (request.requestContentType === ContentType.MultipartFormData) {
      request.body = this.toFormData(request.body);
    } else {
      request.body = JSON.stringify(request.requestSchema?.parse(request.body));
    }

    return await this.next.handle(request);
  }

  toFormUrlEncoded(body: BodyInit | undefined): string {
    if (body === undefined) {
      return '';
    }

    if (typeof body === 'string') {
      return body;
    }

    if (body instanceof URLSearchParams) {
      return body.toString();
    }

    if (body instanceof FormData) {
      const params = new URLSearchParams();
      body.forEach((value, key) => {
        params.append(key, value.toString());
      });
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
