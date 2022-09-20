import { MockedRequest, MockedResponse, rest } from 'msw';
import { setupServer } from 'msw/node';

type InterceptorContext = {
  handledRequests: number;
  lastRequest?: MockedRequest;
  lastResponse?: MockedResponse & { json: () => Promise<any> };
};

export function setupMockServer() {
  const handlers = [
    rest.all('*', (req, res, ctx) => {
      return res(ctx.json({}));
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  return Object.assign(server, {
    intercept: (
      method: keyof typeof rest,
      cb?: (req: MockedRequest, res: MockedResponse, ctx: InterceptorContext) => any,
    ) => {
      const context: InterceptorContext = { handledRequests: 0, lastRequest: null, lastResponse: null };

      server.use(
        rest[method]('*', (req, res, ctx) => {
          const { status, json, ...data } = cb?.(req, res, context) || {};
          const response = res(ctx.status(status || 200), ctx.json(json || data || ''));

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
    },
  });
}
