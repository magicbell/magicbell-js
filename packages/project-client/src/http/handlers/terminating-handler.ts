import { HttpError } from '../error.js';
import { Request } from '../transport/request.js';
import { RequestFetchAdapter } from '../transport/request-fetch-adapter.js';
import { HttpResponse, RequestHandler } from '../types.js';

export class TerminatingHandler implements RequestHandler {
  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return new RequestFetchAdapter(request).send();
  }
}
