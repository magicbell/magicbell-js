import { ZodUndefined } from 'zod';

import { Request } from '../transport/request.js';
import { ResponseDefinition } from '../transport/types.js';
import { ContentType, HttpResponse, RequestHandler } from '../types.js';
import { ResponseMatcher } from '../utils/response-matcher.js';

export class ResponseValidationHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request): Promise<HttpResponse<T>> {
    const response = await this.next!.handle<T>(request);

    return this.decodeBody<T>(request, response);
  }

  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    const stream = this.next!.stream<T>(request);

    for await (const response of stream) {
      const responseChunks = this.splitByDataChunks<T>(response);
      for (const chunk of responseChunks) {
        yield this.decodeBody<T>(request, chunk);
      }
    }
  }

  private splitByDataChunks<T>(response: HttpResponse<T>): HttpResponse<T>[] {
    if (!response.metadata.headers['content-type']?.includes('text/event-stream')) {
      return [response];
    }

    const text = new TextDecoder().decode(response.raw);
    const encoder = new TextEncoder();
    return text
      .split('\n')
      .filter((line) => line.startsWith('data: '))
      .map((part) => ({
        ...response,
        raw: encoder.encode(part).buffer,
      }));
  }

  private decodeBody<T>(request: Request, response: HttpResponse<T>): HttpResponse<T> {
    const responseMatcher = new ResponseMatcher(request.responses);
    const responseDefinition = responseMatcher.getResponseDefinition(response);

    if (!responseDefinition || !this.hasContent(responseDefinition, response)) {
      return response;
    }

    const contentType = responseDefinition.contentType;
    const contentTypeHandlers: {
      [key: string]: (req: Request, resDef: ResponseDefinition, res: HttpResponse<T>) => HttpResponse<T>;
    } = {
      [ContentType.Binary]: this.decodeFile,
      [ContentType.Image]: this.decodeFile,
      [ContentType.MultipartFormData]: this.decodeMultipartFormData,
      [ContentType.Text]: this.decodeText,
      [ContentType.Xml]: this.decodeText,
      [ContentType.FormUrlEncoded]: this.decodeFormUrlEncoded,
      [ContentType.EventStream]: this.decodeEventStream,
    };

    if (contentTypeHandlers[contentType]) {
      return contentTypeHandlers[contentType].call(this, request, responseDefinition, response);
    }

    if (response.metadata.headers['content-type']?.includes('text/event-stream')) {
      return this.decodeEventStream(request, responseDefinition, response);
    }

    return this.decodeJson(request, responseDefinition, response);
  }

  private decodeFile<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, response.raw),
    };
  }

  private decodeMultipartFormData<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const formData = this.fromFormData(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, formData),
    };
  }

  private decodeText<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, decodedBody),
    };
  }

  private decodeFormUrlEncoded<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    const urlEncoded = this.fromUrlEncoded(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, urlEncoded),
    };
  }

  private decodeEventStream<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    let decodedBody = new TextDecoder().decode(response.raw);
    if (decodedBody.startsWith('data: ')) {
      decodedBody = decodedBody.substring(6);
    }
    // Note: this assumes that the content of data is a valid JSON string
    const json = JSON.parse(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, json),
    };
  }

  private decodeJson<T>(
    request: Request,
    responseDefinition: ResponseDefinition,
    response: HttpResponse<T>,
  ): HttpResponse<T> {
    const decodedBody = new TextDecoder().decode(response.raw);
    const json = JSON.parse(decodedBody);
    return {
      ...response,
      data: this.validate<T>(request, responseDefinition, json),
    };
  }

  private validate<T>(request: Request, response: ResponseDefinition, data: any): T {
    if (request.validation?.responseValidation) {
      return response.schema.parse(data);
    }
    return data;
  }

  private hasContent<T>(responseDefinition: ResponseDefinition, response: HttpResponse<T>): boolean {
    return (
      !!responseDefinition.schema &&
      !(responseDefinition.schema instanceof ZodUndefined) &&
      response.metadata.status !== 204
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
