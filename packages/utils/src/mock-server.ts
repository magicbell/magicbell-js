import { MockedRequest, MockedResponse, rest } from 'msw';
import { c as RequestHandler } from 'msw/lib/glossary-de6278a9';
import { setupServer } from 'msw/node';

type InterceptorContext = {
  handledRequests: number;
  lastRequest?: MockedRequest & { params: Record<string, string> };
  lastResponse?: MockedResponse & { json: () => Promise<any> };
};

type InterceptorCallback = (req: MockedRequest, res: MockedResponse, ctx: InterceptorContext) => MockReturnValue;

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

export function mockHandler(
  method: keyof typeof rest,
  path: string,
  cb: MockReturnValue | ((req: MockedRequest, res: MockedResponse, ctx: InterceptorContext) => MockReturnValue),
) {
  path = path.startsWith('/') ? `*${path}` : path;
  return rest[method](path, (req, res, ctx) => {
    const {
      status,
      statusText,
      json,
      contentType = 'application/json',
      cacheControl = 'no-cache',
      passThrough = false,
      ...data
    } = (typeof cb === 'function' ? cb(req, res, ctx) : cb) || {};

    if (passThrough) return req.passthrough();

    return res(
      ctx.status(status || 200, statusText),
      ctx.set('Content-Type', contentType),
      ctx.set('Cache-Control', cacheControl),
      ctx.json(json || data || ''),
    );
  });
}

export function setupMockServer(...handlers: RequestHandler[]) {
  const defaultHandlers = [
    ...handlers,
    rest.all('*', (req, res, ctx) => {
      if (req.url.port && req.url.port !== '80' && req.url.port !== '443') {
        // pass through requests on non 80 or 443 ports
        // we assume that those requests are proxied to a mock server
        return req.passthrough();
      }

      return res(ctx.json({}));
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
    method: keyof typeof rest,
    path: string,
    cb?: MockReturnValue | InterceptorCallback,
  ): InterceptorContext;
  function intercept(method: keyof typeof rest, cb?: MockReturnValue | InterceptorCallback): InterceptorContext;
  function intercept(
    method: keyof typeof rest,
    pathOrCb?: string | MockReturnValue | InterceptorCallback,
    cb?: MockReturnValue | InterceptorCallback,
  ): InterceptorContext {
    const context: InterceptorContext = { handledRequests: 0, lastRequest: null, lastResponse: null };
    cb = typeof pathOrCb === 'string' ? cb : pathOrCb;
    const path = typeof pathOrCb === 'string' ? (pathOrCb.startsWith('/') ? `*${pathOrCb}` : pathOrCb) : '*';

    server.use(
      rest[method](path, (req, res, ctx) => {
        const {
          status,
          json,
          contentType = 'application/json',
          cacheControl = 'no-cache',
          passThrough = false,
          ...data
        } = (typeof cb === 'function' ? cb(req, res, ctx) : cb) || {};

        if (passThrough) return req.passthrough();

        // Response('', { status: 204 }) is invalid
        const body = [204].includes(status) ? null : ctx.json(json || data || '');

        const response = res(
          ctx.status(status || 200),
          ctx.set('Content-Type', contentType),
          ctx.set('Cache-Control', cacheControl),
          body,
        );

        context.handledRequests++;
        context.lastRequest = req;
        response.then((res) => {
          context.lastResponse = res;
          context.lastResponse.json = async () => JSON.parse(res.body);
        });

        return response;
      }),
    );

    return context;
  }

  return Object.assign(server, { intercept });
}
