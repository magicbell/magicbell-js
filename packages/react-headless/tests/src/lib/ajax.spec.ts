import faker from 'faker';
import { Response, Server } from 'miragejs';
import { deleteAPI, fetchAPI, postAPI, putAPI } from '../../../src/lib/ajax';
import clientSettings from '../../../src/stores/clientSettings';

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

      describe('headers', () => {
        it('sends the api key and client ID headers', async () => {
          const { setState, getState } = clientSettings;
          const { clientId } = getState();
          const apiKey = faker.random.alphaNumeric(40);
          setState({ apiKey });

          await fetchAPI('/notifications');

          const requests = server.pretender.handledRequests;
          expect(requests[0].requestHeaders).toMatchObject({
            'X-MAGICBELL-API-KEY': apiKey,
            'X-MAGICBELL-CLIENT-ID': clientId,
          });
        });

        describe('the user email is set', () => {
          it('sends the X-MAGICBELL-USER-EMAIL header', async () => {
            const userEmail = faker.internet.email();
            const { setState } = clientSettings;
            setState({ userEmail });

            await fetchAPI('/notifications');

            const requests = server.pretender.handledRequests;
            expect(requests[0].requestHeaders).toMatchObject({
              'X-MAGICBELL-USER-EMAIL': userEmail,
            });
          });
        });

        describe('the user external ID is set', () => {
          it('sends the X-MAGICBELL-USER-EXTERNAL-ID header', async () => {
            const userExternalId = faker.internet.email();
            const { setState } = clientSettings;
            setState({ userExternalId });

            await fetchAPI('/notifications');

            const requests = server.pretender.handledRequests;
            expect(requests[0].requestHeaders).toMatchObject({
              'X-MAGICBELL-USER-EXTERNAL-ID': userExternalId,
            });
          });
        });

        describe('the api secret is set', () => {
          it('sends the X-MAGICBELL-API-SECRET header', async () => {
            const apiSecret = faker.random.alphaNumeric();
            const { setState } = clientSettings;
            setState({ apiSecret });

            await fetchAPI('/notifications');

            const requests = server.pretender.handledRequests;
            expect(requests[0].requestHeaders).toMatchObject({
              'X-MAGICBELL-API-SECRET': apiSecret,
            });
          });
        });

        describe('the user key is set', () => {
          it('sends the X-MAGICBELL-USER-KEY header', async () => {
            const userKey = faker.random.alphaNumeric();
            const { setState } = clientSettings;
            setState({ userKey });

            await fetchAPI('/notifications');

            const requests = server.pretender.handledRequests;
            expect(requests[0].requestHeaders).toMatchObject({
              'X-MAGICBELL-USER-KEY': userKey,
            });
          });
        });
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
  });
});
