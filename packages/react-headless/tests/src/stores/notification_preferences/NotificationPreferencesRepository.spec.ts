import humps from 'humps';
import { Response, Server } from 'miragejs';

import NotificationPreferencesRepository from '../../../../src/stores/notification_preferences/NotificationPreferencesRepository';
import NotificationPreferencesFactory, {
  sampleNotificationPreferences,
} from '../../../factories/NotificationPreferencesFactory';

describe('stores', () => {
  describe('notification_preferences', () => {
    describe('NotificationPreferencesRepository', () => {
      let repo: NotificationPreferencesRepository;
      let server;

      beforeEach(() => {
        repo = new NotificationPreferencesRepository();
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
          trackRequests: true,
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      describe('.get', () => {
        it('fetches v2 of the preferences endpoint', async () => {
          const preferences = NotificationPreferencesFactory.build();
          server.get('/notification_preferences', {
            notification_preferences: humps.decamelizeKeys(preferences),
          });

          await repo.get();

          const requests = server.pretender.handledRequests;
          expect(requests[0].requestHeaders).toMatchObject({ 'Accept-Version': 'v2' });
        });

        describe('successful response', () => {
          it('returns the response in camel case', async () => {
            const preferences = NotificationPreferencesFactory.build();
            server.get('/notification_preferences', {
              notification_preferences: humps.decamelizeKeys(preferences),
            });

            const response = await repo.get();
            expect(response).toEqual(preferences);
          });
        });

        describe('error handling', () => {
          it('throws an error on 403 on get', async () => {
            server.get('/notification_preferences', new Response(403, {}, {}));
            expect.hasAssertions();

            await expect(() => repo.get()).rejects.toThrow('Request failed with status code 403');
          });
          it.only('throws an error on 403 on update', async () => {
            server.put('/notification_preferences', new Response(403, {}, {}));
            expect.hasAssertions();

            await expect(() => repo.update(sampleNotificationPreferences)).rejects.toThrow(
              'Request failed with status code 403',
            );
          });
        });
      });

      describe('.update', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            const preferences = NotificationPreferencesFactory.build();
            server.put('/notification_preferences', new Response(200, {}, { notification_preferences: preferences }));
            const response = await repo.update(preferences);

            expect(response).toEqual(preferences);
          });
        });

        describe('error handling', () => {
          it('returns false on 500', async () => {
            const data = NotificationPreferencesFactory.build();
            server.put('/notification_preferences', new Response(500, {}, ''));
            const response = await repo.update(data);

            expect(response).toBe(false);
          });
        });
      });
    });
  });
});
