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

/**
 * Core HTTP client for making API requests.
 * Manages request/response handling through a chain of handlers for validation, retry, hooks, and more.
 */
export class HttpClient {
  /** Chain of request handlers that process requests in sequence */
  private readonly requestHandlerChain = new RequestHandlerChain();

  /**
   * Creates a new HTTP client with configured request handlers.
   * @param config - SDK configuration including base URL and authentication
   * @param hook - Optional custom hook for request/response interception
   */
  constructor(private config: SdkConfig, hook = new CustomHook()) {
    this.requestHandlerChain.addHandler(new ResponseValidationHandler());
    this.requestHandlerChain.addHandler(new RequestValidationHandler());
    this.requestHandlerChain.addHandler(new RetryHandler());
    this.requestHandlerChain.addHandler(new HookHandler(hook));
    this.requestHandlerChain.addHandler(new TerminatingHandler());
  }

  /**
   * Executes a standard HTTP request.
   * @template T - The expected response data type
   * @param request - The HTTP request to execute
   * @returns A promise that resolves to the HTTP response
   */
  call<T>(request: Request): Promise<HttpResponse<T>> {
    return this.requestHandlerChain.callChain(request);
  }

  /**
   * Executes a streaming HTTP request that yields responses incrementally.
   * @template T - The expected response data type for each chunk
   * @param request - The HTTP request to execute
   * @returns An async generator that yields HTTP responses
   */
  async *stream<T>(request: Request): AsyncGenerator<HttpResponse<T>> {
    yield* this.requestHandlerChain.streamChain(request);
  }

  /**
   * Executes a paginated HTTP request and extracts the page data from the response.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The paginated HTTP request to execute
   * @returns A promise that resolves to the paginated HTTP response
   * @throws Error if the response contains no data to paginate through
   */
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

  /**
   * Executes a cursor-paginated HTTP request and extracts both page data and the next cursor.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The cursor-paginated HTTP request to execute
   * @returns A promise that resolves to the cursor-paginated HTTP response with next cursor
   * @throws Error if the response contains no data to paginate through
   */
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

  /**
   * Updates the base URL for all subsequent requests.
   * @param url - The new base URL to use
   */
  setBaseUrl(url: string): void {
    this.config.baseUrl = url;
  }

  /**
   * Updates the SDK configuration.
   * @param config - The new SDK configuration
   */
  setConfig(config: SdkConfig): void {
    this.config = config;
  }

  /**
   * Extracts page data from a full API response using the configured pagination path.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The request containing pagination configuration
   * @param data - The full response data to extract the page from
   * @returns The extracted and parsed page data
   * @throws Error if pagination is not configured or page extraction fails
   */
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

  /**
   * Extracts the next cursor from a full API response for cursor-based pagination.
   * @template FullResponse - The complete response type from the API
   * @template Page - The type of a single page of data
   * @param request - The request containing cursor pagination configuration
   * @param data - The full response data to extract the cursor from
   * @returns The next cursor string, null if no more pages, or undefined if not cursor pagination
   */
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
