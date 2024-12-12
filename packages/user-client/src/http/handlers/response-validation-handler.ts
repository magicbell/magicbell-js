import { ZodUndefined } from 'zod';

import { Request } from '../transport/request.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';

export class ResponseValidationHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    const response = await this.next!.handle(request);

    return this.decodeBody(request, response);
  }

  async *stream<T>(request: Request<T>): AsyncGenerator<HttpResponse<T>> {
    const stream = this.next!.stream(request);

    for await (const response of stream) {
      const responseChunks = this.splitByDataChunks(response);
      for (const chunk of responseChunks) {
        yield this.decodeBody(request, chunk);
      }
    }
  }

  private splitByDataChunks<T>(response: HttpResponse<T>): HttpResponse<T>[] {
    if (!response.metadata.headers['content-type'].includes('text/event-stream')) {
      return [response];
    }

    const text = new TextDecoder().decode(response.raw);
    const encoder = new TextEncoder();
    return text
      .split('\n')
      .filter((line) => line.startsWith('data: '))
      .map((part) => ({
        ...response,
        raw: encoder.encode(part),
      }));
  }

  private decodeBody<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    if (!this.hasContent(request, response)) {
      return response;
    }

    if (request.responseContentType === ContentType.Binary || request.responseContentType === ContentType.Image) {
      return this.decodeFile(request, response);
    }

    if (request.responseContentType === ContentType.MultipartFormData) {
      return this.decodeMultipartFormData(request, response);
    }

    if (request.responseContentType === ContentType.Text || request.responseContentType === ContentType.Xml) {
      return this.decodeText(request, response);
    }

    if (request.responseContentType === ContentType.FormUrlEncoded) {
      return this.decodeFormUrlEncoded(request, response);
    }

    if (
      request.responseContentType === ContentType.EventStream ||
      response.metadata.headers['content-type'].includes('text/event-stream')
    ) {
      return this.decodeEventStream(request, response);
    }

    return this.decodeJson(request, response);
  }

  private decodeFile<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    return {
      ...response,
      data: this.validate<T>(request, response.raw),
    };
  }

  private decodeMultipartFormData<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    const formData = this.fromFormData(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, formData),
    };
  }

  private decodeText<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, decodedBody),
    };
  }

  private decodeFormUrlEncoded<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    const urlEncoded = this.fromUrlEncoded(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, urlEncoded),
    };
  }

  private decodeEventStream<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    let decodedBody = new TextDecoder().decode(response.raw);
    if (decodedBody.startsWith('data: ')) {
      decodedBody = decodedBody.substring(6);
    }
    // Note: this assumes that the content of data is a valid JSON string
    const json = JSON.parse(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, json),
    };
  }

  private decodeJson<T>(request: Request<T>, response: HttpResponse<T>): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    const json = JSON.parse(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, json),
    };
  }

  private validate<T>(request: Request<T>, data: any): T {
    if (request.validation?.responseValidation) {
      return request.responseSchema.parse(data);
    }
    return data;
  }

  private hasContent<T>(request: Request<T>, response: HttpResponse<T>): boolean {
    return (
      !!request.responseSchema && !(request.responseSchema instanceof ZodUndefined) && response.metadata.status !== 204
    );
  }

  private fromUrlEncoded(urlEncodedData: string): object {
    const pairs = urlEncodedData.split('&');
    const result: Record<string, string> = {};

    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value !== undefined) {
        result[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });

    return result;
  }

  private fromFormData(arrayBuffer: ArrayBuffer): Record<string, string> {
    const decoder = new TextDecoder();
    const text = decoder.decode(arrayBuffer);

    const boundary = text.split('\r\n')[0];
    const parts = text.split(boundary).slice(1, -1);

    const formDataObj: Record<string, string> = {};

    parts.forEach((part) => {
      const [header, value] = part.split('\r\n\r\n');
      const nameMatch = header.match(/name="([^"]+)"/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        formDataObj[name] = value?.trim() || '';
      }
    });

    return formDataObj;
  }
}
