import { ZodError } from 'zod';

import { ValidationError } from '../errors/validation-error.js';
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
      try {
        const parsedBody = request.requestSchema?.parse(request.body);
        request.body = JSON.stringify(parsedBody);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new ValidationError(error, request.body);
        }
        throw error;
      }
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
      request.body = this.toFormData(request.body, request.filename, request.filenames);
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

  toFormData(body: Record<string, any>, filename?: string, filenames?: string[]): FormData {
    const formData = new FormData();

    Object.keys(body).forEach((key: any) => {
      const value: any = body[key];
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          if (v instanceof ArrayBuffer) {
            // For arrays of files, use the corresponding filename from filenames array
            const fileFilename = filenames && filenames[i] ? filenames[i] : `${key}[${i}]`;
            formData.append(`${key}[${i}]`, new Blob([v]), fileFilename);
          } else {
            formData.append(`${key}[${i}]`, v);
          }
        });
      } else if (value instanceof ArrayBuffer) {
        // For single files, use the provided filename or fallback to the key name
        const fileFilename = filename || key;
        formData.append(key, new Blob([value]), fileFilename);
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }
}
