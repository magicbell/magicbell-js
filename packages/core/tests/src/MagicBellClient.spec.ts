import faker from 'faker';
import { Server } from 'miragejs';

import MagicBellClient, { Config } from '../../src';
import * as ajax from '../../src/lib/ajax';

describe('MagicBellClient', () => {
  let apiKey;
  let apiSecret;
  let userEmail;
  let userExternalId;
  let userKey;
  let client: MagicBellClient;
  let server;

  beforeEach(() => {
    apiKey = faker.random.alphaNumeric();
    userEmail = faker.internet.email();
    userExternalId = faker.random.alphaNumeric(10);
    userKey = faker.random.alphaNumeric();
    apiSecret = faker.random.alphaNumeric();

    server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
    server.get(`/config`, {
      ws: {
        region: 'eu',
        channel: 'user_4409-project_18',
        auth_url: '/ws/auth',
      },
    });

    client = new MagicBellClient({ apiKey, userEmail, userKey, apiSecret });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('#createInstance', () => {
    it('fetches the config', async () => {
      const spy = vi.spyOn(ajax, 'fetchAPI');
      const { config } = await MagicBellClient.createInstance({ apiKey, userEmail, userKey, apiSecret });

      expect(spy).toHaveBeenCalledTimes(1);

      expect(config).toBeDefined();
      expect(config?.ws).toEqual({
        region: 'eu',
        channel: 'user_4409-project_18',
        authUrl: '/ws/auth',
      });
    });
  });

  describe('constructor', () => {
    it('creates a config instance', () => {
      const { config } = client;

      expect(config).toBeInstanceOf(Config);
      expect(config?.apiKey).toBe(apiKey);
      expect(config?.userEmail).toBe(userEmail);
      expect(config?.userExternalId).toBeUndefined();
      expect(config?.userKey).toBe(userKey);
      expect(config?.apiSecret).toBe(apiSecret);
    });

    describe('without an api secret', () => {
      it('creates a config instance without any api secret', () => {
        client = new MagicBellClient({ apiKey, userEmail, userKey });
        const { config } = client;

        expect(config).toBeInstanceOf(Config);
        expect(config?.apiKey).toBe(apiKey);
        expect(config?.userEmail).toBe(userEmail);
        expect(config?.userExternalId).toBeUndefined();
        expect(config?.userKey).toBe(userKey);
        expect(config?.apiSecret).toBeUndefined();
      });
    });

    describe('use external ID instead of email', () => {
      it('creates a config instance with the external ID', () => {
        client = new MagicBellClient({ apiKey, userExternalId, userKey });
        const { config } = client;

        expect(config).toBeInstanceOf(Config);
        expect(config?.apiKey).toBe(apiKey);
        expect(config?.userEmail).toBeUndefined();
        expect(config?.userExternalId).toBe(userExternalId);
        expect(config?.userKey).toBe(userKey);
        expect(config?.apiSecret).toBeUndefined();
      });
    });
  });

  describe('.getStore', () => {
    it('returns the store', () => {
      const store = client.getStore();
      expect(store).toBe(client._store);
    });
  });
});
