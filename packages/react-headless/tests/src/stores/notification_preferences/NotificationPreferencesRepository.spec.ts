import humps from 'humps';
import { Response, Server } from 'miragejs';
import NotificationPreferencesRepository from '../../../../src/stores/notification_preferences/NotificationPreferencesRepository';
import NotificationPreferencesFactory from '../../../factories/NotificationPreferencesFactory';

describe('stores', () => {
  describe('notification_preferences', () => {
    describe('NotificationPreferencesRepository', () => {
      let repo: NotificationPreferencesRepository;
      let server;

      beforeEach(() => {
        repo = new NotificationPreferencesRepository();
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
      });

      afterEach(() => {
        server.shutdown();
      });

      describe('.get', () => {
        describe('successful response', () => {
          it('returns the response in camel case', async () => {
            const preferences = NotificationPreferencesFactory.build();
            server.get('/notification_preferences', {
              notification_preferences: humps.decamelizeKeys(preferences),
            });

            const response = await repo.get();

            expect(response).toEqual({ notificationPreferences: preferences });
          });
        });

        describe('error handling', () => {
          it('throws an error', async () => {
            server.get('/notification_preferences', new Response(403, {}, {}));
            expect.hasAssertions();

            await expect(() => repo.get()).rejects.toThrow('Request failed with status code 403');
          });
        });
      });

      describe('.update', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            const data = NotificationPreferencesFactory.build();
            server.put('/notification_preferences', new Response(204, {}, ''));
            const response = await repo.update(data);

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
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
