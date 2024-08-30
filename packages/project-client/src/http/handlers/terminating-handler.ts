import { Request } from '../transport/request';
import { RequestFetchAdapter } from '../transport/request-fetch-adapter';
import { HttpResponse, RequestHandler } from '../types';

export class TerminatingHandler implements RequestHandler {
  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return new RequestFetchAdapter(request).send();
  }
}
