import { AuthHandler } from './handlers/auth-handler.js';
import { RequestHandlerChain } from './handlers/handler-chain.js';
import { HookHandler } from './handlers/hook-handler.js';
import { HeaderHandler } from './handlers/mb-header-handler.js';
import { RequestValidationHandler } from './handlers/request-validation-handler.js';
import { ResponseValidationHandler } from './handlers/response-validation-handler.js';
import { RetryHandler } from './handlers/retry-handler.js';
import { TerminatingHandler } from './handlers/terminating-handler.js';
import { CustomHook } from './hooks/custom-hook.js';
import { Request } from './transport/request.js';
import { HttpResponse, SdkConfig } from './types.js';

export class HttpClient {
  private readonly requestHandlerChain = new RequestHandlerChain();

  constructor(private config: SdkConfig, hook = new CustomHook()) {
    this.requestHandlerChain.addHandler(new HeaderHandler());
    this.requestHandlerChain.addHandler(new ResponseValidationHandler());
    this.requestHandlerChain.addHandler(new RequestValidationHandler());
    this.requestHandlerChain.addHandler(new AuthHandler());
    this.requestHandlerChain.addHandler(new RetryHandler());
    this.requestHandlerChain.addHandler(new HookHandler(hook));
    this.requestHandlerChain.addHandler(new TerminatingHandler());
  }

  call<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return this.requestHandlerChain.callChain(request);
  }

  public async callPaginated<FullResponse, Page>(request: Request<FullResponse, Page>): Promise<HttpResponse<Page>> {
    const response = await this.call<FullResponse>(request as any);

    if (!response.data) {
      throw new Error('now response data to paginate through');
    }

    return {
      ...response,
      data: this.getPage<FullResponse, Page>(request, response.data),
    };
  }

  setBaseUrl(url: string): void {
    this.config.baseUrl = url;
  }

  setConfig(config: SdkConfig): void {
    this.config = config;
  }

  private getPage<FullResponse, Page>(request: Request<FullResponse, Page>, data: FullResponse): Page {
    if (!request.pagination) {
      throw new Error('getPage called for request without pagination property');
    }

    let curr: any = data;
    for (const segment of request.pagination?.pagePath || []) {
      curr = curr[segment];
    }

    const page = request.pagination?.pageSchema?.parse(curr);
    if (!page) {
      throw new Error(
        `error getting page data. Curr: ${JSON.stringify(curr)}. PagePath: ${
          request.pagination?.pagePath
        }. Data: ${JSON.stringify(data)}`,
      );
    }
    return page;
  }
}
