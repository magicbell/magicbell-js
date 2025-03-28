import { http, passthrough, RequestHandler, ResponseResolver } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

type InterceptorContext = {
  handledRequests: number;
  lastRequest?: Request;
  lastResponse?: Response;
};

export type ResponseResolverInfo = Parameters<ResponseResolver>[0];
type InterceptorCallback = (info: ResponseResolverInfo) => MockReturnValue;

type MockReturnValue =
  | {
      status?: number;
      statusText?: string;
      contentType?: string;
      cacheControl?: string;
      passThrough?: boolean;
      json?: any;
    }
  | { [key: string]: any };

export function mockHandler(method: keyof typeof http, path: string, cb: MockReturnValue | InterceptorCallback) {
  path = path.startsWith('/') ? `*${path}` : path;
  return http[method](path, async (info) => {
    const {
      status,
      statusText,
      json,
      contentType = 'application/json',
      cacheControl = 'no-cache',
      passThrough = false,
      ...data
    } = (typeof cb === 'function' ? await cb(info) : cb) || {};

    if (passThrough) return passthrough();

    return new Response(JSON.stringify(json || data || ''), {
      status: status || 200,
      statusText: statusText,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
    });
  });
}

export function setupMockServer(...handlers: RequestHandler[]) {
  const defaultHandlers = [
    ...handlers,
    http.all('*', () => {
      return new Response('{}');
    }),
  ];

  const server = setupServer(...defaultHandlers);

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: (req) => {
        throw new Error(`Unhandled request: ${req.url.toString()}`);
      },
    });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  process.once('SIGINT', () => server.close());
  process.once('SIGTERM', () => server.close());

  function intercept(
    method: keyof typeof http,
    path: string,
    cb?: MockReturnValue | InterceptorCallback,
  ): InterceptorContext;
  function intercept(method: keyof typeof http, cb?: MockReturnValue | InterceptorCallback): InterceptorContext;
  function intercept(
    method: keyof typeof http,
    pathOrCb?: string | MockReturnValue | InterceptorCallback,
    cb?: MockReturnValue | InterceptorCallback,
  ): InterceptorContext {
    const context: InterceptorContext = { handledRequests: 0, lastRequest: null, lastResponse: null };
    cb = typeof pathOrCb === 'string' ? cb : pathOrCb;
    const path = typeof pathOrCb === 'string' ? (pathOrCb.startsWith('/') ? `*${pathOrCb}` : pathOrCb) : '*';

    server.use(
      http[method](path, async (info) => {
        const {
          status,
          statusText,
          json,
          contentType = 'application/json',
          cacheControl = 'no-cache',
          passThrough = false,
          ...data
        } = (typeof cb === 'function' ? await cb(info) : cb) || {};

        if (passThrough) return passthrough();

        // Response('', { status: 204 }) is invalid
        const body = status === 204 ? null : JSON.stringify(json || data || '');

        const response = new Response(body, {
          status: status || 200,
          statusText: statusText || 'ok',
          headers: {
            'Content-Type': contentType,
            'Cache-Control': cacheControl,
          },
        });

        context.handledRequests++;
        context.lastRequest = info.request.clone();
        context.lastResponse = response.clone();
        return response;
      }),
    );

    return context;
  }

  return Object.assign(server, { intercept });
}
