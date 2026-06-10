import { ZodError } from 'zod';

import { ValidationError } from '../errors/validation-error.js';
import { Request } from '../transport/request.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';

/**
 * Request handler that validates and serializes request bodies based on content type.
 * Supports JSON, XML, text, binary, form data, and multipart form data.
 */
export class RequestValidationHandler implements RequestHandler {
  /** Next handler in the chain */
  next?: RequestHandler;

  /**
   * Handles a standard HTTP request with validation.
   * @template T - The expected response data type
   * @param request - The HTTP request to validate
   * @returns A promise that resolves to the HTTP response
   * @throws Error if no next handler is set
   */
  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    this.validateRequest(request);

    return this.next.handle<T>(request);
  }

  /**
   * Handles a streaming HTTP request with validation.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to validate
   * @returns An async generator that yields HTTP responses
   * @throws Error if no next handler is set
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in ContentTypeHandler.');
    }

    this.validateRequest(request);

    yield* this.next.stream<T>(request);
  }

  /**
   * Validates and serializes the request body based on its content type.
   * @param request - The HTTP request to validate
   * @throws ValidationError if Zod schema validation fails
   */
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

  /**
   * Converts request body to URL-encoded form data format.
   * @param request - The HTTP request with body to convert
   * @returns URL-encoded string representation of the body
   */
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

  /**
   * Converts request body to multipart form data format.
   * Handles files (ArrayBuffer), arrays, and regular values.
   * @param body - The request body object
   * @param filename - Optional filename for single file uploads
   * @param filenames - Optional filenames array for array of file uploads
   * @returns FormData object with serialized body
   */
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
