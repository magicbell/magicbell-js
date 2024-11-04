import { HttpError } from '../error.js';
import { HttpMetadata } from '../types.js';
import { Hook, HttpRequest, HttpResponse } from './hook.js';

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
    return new HttpError(response.metadata, response.raw);
  }
}
