import faker from 'faker';
import { Server } from 'miragejs';

import Config from '../../../src/models/Config';

describe('models', () => {
  describe('Config', () => {
    let apiKey: string;
    let userEmail: string;
    let userKey: string;
    let config: Config;

    beforeEach(() => {
      apiKey = faker.random.alphaNumeric();
      userEmail = faker.internet.email();
      userKey = faker.random.alphaNumeric();

      config = new Config({ apiKey, userEmail, userKey });
    });

    describe('constructor', () => {
      it('sets the provided attributes', () => {
        expect(config.apiKey).toBe(apiKey);
        expect(config.userEmail).toBe(userEmail);
        expect(config.userKey).toBe(userKey);
      });
    });

    describe('.fetch', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.get(`/config`, {
          ws: {
            region: 'eu',
            channel: 'user_4409-project_18',
            auth_url: '/ws/auth',
          },
          inbox: {
            features: {
              no_magicbell_branding: { enabled: true },
            },
          },
          channels: {
            web_push: {
              enabled: true,
              config: {
                subscribe_url: 'http://wispy-sun-4045.lvh.me:3000/web_push_subscriptions',
                vapid_authentication: {
                  public_key:
                    'BHVpzyR2ndBY3NHJeKddexuM729GTq_TjTFinjMVV_D9Sl_ZYhjjdASfibXdm2oOLCMs-bmlkUmAQ8Gjj1dUny8=',
                },
              },
            },
          },
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('sets the attribues of the instance', async () => {
        await config.fetch();

        expect(config.ws).toEqual({
          region: 'eu',
          channel: 'user_4409-project_18',
          authUrl: '/ws/auth',
        });

        expect(config.inbox).toEqual({
          features: { noMagicbellBranding: { enabled: true } },
        });

        expect(config.channels).toEqual({
          webPush: {
            enabled: true,
            config: {
              subscribeUrl: 'http://wispy-sun-4045.lvh.me:3000/web_push_subscriptions',
              vapidAuthentication: {
                publicKey: 'BHVpzyR2ndBY3NHJeKddexuM729GTq_TjTFinjMVV_D9Sl_ZYhjjdASfibXdm2oOLCMs-bmlkUmAQ8Gjj1dUny8=',
              },
            },
          },
        });
      });
    });
  });
});
