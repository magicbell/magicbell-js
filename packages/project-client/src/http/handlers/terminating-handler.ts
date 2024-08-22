import { Request } from '../transport/request';
import { RequestAxiosAdapter } from '../transport/request-axios-adapter';
import { HttpResponse, RequestHandler } from '../types';

export class TerminatingHandler implements RequestHandler {
  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return new RequestAxiosAdapter(request).send();
  }
}
