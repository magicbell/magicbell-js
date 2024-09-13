import { HttpMetadata } from '../types.js';
import { Hook, HttpError, HttpRequest, HttpResponse } from './hook.js';

export class CustomHook implements Hook {
  public async beforeRequest(request: HttpRequest, params: Map<string, string>): Promise<HttpRequest> {
    return request;
  }

  public async afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpResponse<any>> {
    return response;
  }

  public async onError(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpError> {
    return new CustomHttpError('a custom error message', response.metadata);
  }
}

class CustomHttpError implements HttpError {
  constructor(public error: string, public metadata: HttpMetadata) {}
}
