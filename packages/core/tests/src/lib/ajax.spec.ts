import { Response, Server } from 'miragejs';
import { deleteAPI, fetchAPI, postAPI, putAPI, setupAjax } from '../../../src/lib/ajax';

describe('lib', () => {
  describe('ajax', () => {
    let server;

    beforeEach(() => {
      server = new Server({
        environment: 'test',
        trackRequests: true,
        urlPrefix: 'https://api.magicbell.com',
        timing: 50,
      });
    });

    afterEach(() => {
      server.shutdown();
    });

    describe('.deleteAPI', () => {
      beforeEach(() => {
        server.delete('/notifications/1', {});
      });

      it('sends a DELETE request', async () => {
        const response = await deleteAPI('/notifications/1');
        expect(response).toEqual({});
      });

      describe('the server responds with an error', () => {
        beforeEach(() => {
          server.delete('/notifications/1', new Response(404, {}, {}));
        });

        it('throws the original error', async () => {
          try {
            await deleteAPI('/notifications/1');
          } catch (error) {
            expect(error.response).toMatchObject({ status: 404, statusText: 'Not Found' });
          }
        });
      });
    });

    describe('.fetchAPI', () => {
      beforeEach(() => {
        server.get('/notifications', { notifications: [] });
      });

      it('sends a GET request', async () => {
        const response = await fetchAPI('/notifications');
        expect(response).toEqual({ notifications: [] });
      });

      describe('the server responds with an error', () => {
        beforeEach(() => {
          server.get('/notifications', new Response(403, {}, {}));
        });

        it('throws the original error', async () => {
          try {
            await fetchAPI('/notifications');
          } catch (error) {
            expect(error.response).toMatchObject({ status: 403, statusText: 'Forbidden' });
          }
        });
      });
    });

    describe('.postAPI', () => {
      beforeEach(() => {
        server.post('/notifications', { notification: { id: 1 } });
      });

      it('sends a POST request', async () => {
        const data = { title: 'Another notification' };
        const response = await postAPI('/notifications', data);

        expect(response).toEqual({ notification: { id: 1 } });
      });

      it('includes the data in the request', async () => {
        const data = { title: 'Another notification' };
        await postAPI('/notifications', data);

        const requests = server.pretender.handledRequests;
        expect(requests[0].requestBody).toEqual(JSON.stringify(data));
      });

      describe('the server responds with an error', () => {
        beforeEach(() => {
          server.post('/notifications', new Response(400, {}, {}));
        });

        it('throws the original error', async () => {
          const data = { title: 'Another notification' };

          try {
            await postAPI('/notifications', data);
          } catch (error) {
            expect(error.response).toMatchObject({ status: 400, statusText: 'Bad Request' });
          }
        });
      });
    });

    describe('.putAPI', () => {
      beforeEach(() => {
        server.put('/notifications/1', { notification: { id: 1, title: 'A title' } });
      });

      it('sends a PUT request', async () => {
        const data = { title: 'A title' };
        const response = await putAPI('/notifications/1', data);

        expect(response).toEqual({ notification: { id: 1, title: 'A title' } });
      });

      it('includes the data in the request', async () => {
        const data = { title: 'A title' };
        await putAPI('/notifications/1', data);

        const requests = server.pretender.handledRequests;
        expect(requests[0].requestBody).toEqual(JSON.stringify(data));
      });

      describe('the server responds with an error', () => {
        beforeEach(() => {
          server.put('/notifications/1', new Response(400, {}, {}));
        });

        it('throws the original error', async () => {
          const data = { name: 'Another name' };

          try {
            await putAPI('/notifications/1', data);
          } catch (error) {
            expect(error.response).toMatchObject({ status: 400, statusText: 'Bad Request' });
          }
        });
      });
    });

    describe('.setupAjax', () => {
      beforeEach(() => {
        server.urlPrefix = 'https://api.example.org';
        server.get('/auth', { token: 'c6bd668c7f0fafe4b8e6' });
      });

      it('allows to change the baseURL for API requests', async () => {
        setupAjax({
          apiKey: 'lIcW9tgil2aocNy91vtzUziieXEyb1nRsQqC',
          userEmail: 'user@example.com',
          userKey: 'Pv3nsaxgeAjzd3ITy7BbZIg4WpbW1S',
          baseURL: 'https://api.example.org',
        });

        const response = await fetchAPI('/auth');
        const requests = server.pretender.handledRequests;

        expect(requests[0].url).toEqual('https://api.example.org/auth');
        expect(response).toEqual({ token: 'c6bd668c7f0fafe4b8e6' });
      });

      describe('an api secret is provided', () => {
        it('sets a default header for the client', async () => {
          setupAjax({
            apiKey: 'lIcW9tgil2aocNy91vtzUziieXEyb1nRsQqC',
            userEmail: 'user@example.com',
            apiSecret: 'EaD9ezlzbMq/Xx+5Bf1QPfueNkHRs0xYTrU86Q==',
            userKey: 'Pv3nsaxgeAjzd3ITy7BbZIg4WpbW1S',
            baseURL: 'https://api.example.org',
          });

          await fetchAPI('/auth');
          const requests = server.pretender.handledRequests;

          expect(requests[0].requestHeaders).toMatchObject({
            'X-MAGICBELL-API-KEY': 'lIcW9tgil2aocNy91vtzUziieXEyb1nRsQqC',
            'X-MAGICBELL-API-SECRET': 'EaD9ezlzbMq/Xx+5Bf1QPfueNkHRs0xYTrU86Q==',
          });
        });
      });

      describe('an external ID is provided', () => {
        it('sets a default header for the client', async () => {
          setupAjax({
            apiKey: 'lIcW9tgil2aocNy91vtzUziieXEyb1nRsQqC',
            userExternalId: '+59840003484',
            baseURL: 'https://api.example.org',
          });

          await fetchAPI('/auth');
          const requests = server.pretender.handledRequests;

          expect(requests[0].requestHeaders).toMatchObject({
            'X-MAGICBELL-API-KEY': 'lIcW9tgil2aocNy91vtzUziieXEyb1nRsQqC',
            'X-MAGICBELL-USER-EXTERNAL-ID': '+59840003484',
          });
        });
      });
    });
  });
});
