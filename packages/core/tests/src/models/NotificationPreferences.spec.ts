import { Server } from 'miragejs';

import NotificationPreferences from '../../../src/models/NotificationPreferences';

describe('models', () => {
  describe('NotificationPreferences', () => {
    let categories;
    let preferences: NotificationPreferences;

    beforeEach(() => {
      categories = { outbound: { inApp: true, webPush: true, email: false } };
      preferences = new NotificationPreferences({ categories });
    });

    describe('constructor', () => {
      it('sets the provided attributes', () => {
        expect(preferences.categories).toStrictEqual(categories);
      });
    });

    describe('.fetch', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.get(`/notification_preferences`, {
          notification_preferences: {
            categories: {
              new_message: {
                in_app: true,
                email: false,
                web_push: false,
              },
              marketing: {
                in_app: false,
                email: true,
                web_push: true,
              },
            },
          },
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('sets the attribues of the instance', async () => {
        await preferences.fetch();

        expect(preferences.categories).toStrictEqual({
          newMessage: {
            inApp: true,
            email: false,
            webPush: false,
          },
          marketing: {
            inApp: false,
            email: true,
            webPush: true,
          },
        });
      });
    });

    describe('.save', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.put(`/notification_preferences`, {
          notification_preferences: {
            categories: {
              marketing: {
                email: false,
              },
            },
          },
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('sets the attribues of the instance', async () => {
        await preferences.save({ categories: { marketing: { email: false } } });

        expect(preferences.categories).toStrictEqual({
          marketing: {
            email: false,
          },
        });
      });
    });
  });
});
