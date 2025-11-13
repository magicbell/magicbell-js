import { RequestHandlerChain } from './handlers/handler-chain.js';
import { HookHandler } from './handlers/hook-handler.js';
import { RequestValidationHandler } from './handlers/request-validation-handler.js';
import { ResponseValidationHandler } from './handlers/response-validation-handler.js';
import { RetryHandler } from './handlers/retry-handler.js';
import { TerminatingHandler } from './handlers/terminating-handler.js';
import { CustomHook } from './hooks/custom-hook.js';
import { Request } from './transport/request.js';
import { isRequestCursorPagination } from './transport/types.js';
import { CursorPaginatedHttpResponse, HttpResponse, PaginatedHttpResponse, SdkConfig } from './types.js';

export class HttpClient {
  private readonly requestHandlerChain = new RequestHandlerChain();

  constructor(private config: SdkConfig, hook = new CustomHook()) {
    this.requestHandlerChain.addHandler(new ResponseValidationHandler());
    this.requestHandlerChain.addHandler(new RequestValidationHandler());
    this.requestHandlerChain.addHandler(new RetryHandler());
    this.requestHandlerChain.addHandler(new HookHandler(hook));
    this.requestHandlerChain.addHandler(new TerminatingHandler());
  }

  call<T>(request: Request): Promise<HttpResponse<T>> {
    return this.requestHandlerChain.callChain(request);
  }

  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    yield* this.requestHandlerChain.streamChain(request);
  }

  public async callPaginated<FullResponse, Page>(request: Request<Page>): Promise<PaginatedHttpResponse<Page>> {
    const response = await this.call<FullResponse>(request as any);

    if (!response.data) {
      throw new Error('no response data to paginate through');
    }

    const page = this.getPage<FullResponse, Page>(request, response.data);

    return {
      ...response,
      data: page,
    };
  }

  public async callCursorPaginated<FullResponse, Page>(
    request: Request<Page>,
  ): Promise<CursorPaginatedHttpResponse<Page>> {
    const response = await this.call<FullResponse>(request as any);

    if (!response.data) {
      throw new Error('no response data to paginate through');
    }

    const page = this.getPage<FullResponse, Page>(request, response.data);
    const nextCursor = this.getNextCursor<FullResponse, Page>(request, response.data);

    return {
      ...response,
      data: page,
      nextCursor,
    };
  }

  setBaseUrl(url: string): void {
    this.config.baseUrl = url;
  }

  setConfig(config: SdkConfig): void {
    this.config = config;
  }

  private getPage<FullResponse, Page>(request: Request<Page>, data: FullResponse): Page {
    if (!request.pagination) {
      throw new Error('getPage called for request without pagination property');
    }

    let curr: any = data;
    for (const segment of request.pagination.pagePath || []) {
      curr = curr[segment];
    }

    const page = request.pagination.pageSchema?.parse(curr);
    if (!page) {
      throw new Error(
        `error getting page data. Curr: ${JSON.stringify(curr)}. PagePath: ${
          request.pagination.pagePath
        }. Data: ${JSON.stringify(data)}`,
      );
    }
    return page;
  }

  private getNextCursor<FullResponse, Page>(request: Request<Page>, data: FullResponse): string | null | undefined {
    if (!isRequestCursorPagination(request.pagination)) {
      return undefined;
    }

    let curr: any = data;
    for (const segment of request.pagination.cursorPath) {
      if (curr === null || curr === undefined) {
        return null;
      }
      curr = curr[segment];
    }

    return request.pagination.cursorSchema?.parse(curr) ?? null;
  }
}
