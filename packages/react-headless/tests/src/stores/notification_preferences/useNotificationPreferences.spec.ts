import faker from '@faker-js/faker';
import * as humps from 'humps';
import { Response, Server } from 'miragejs';
import { AnyRegistry } from 'miragejs/-types';
import { beforeAll } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import useNotificationPreferences from '../../../../src/stores/notification_preferences';
import { CategoryChannelPreference } from '../../../../src/types/IRemoteNotificationPreferences';
import {
  sampleNotificationPreferences,
  sampleNotificationSaveResponse,
} from '../../../factories/NotificationPreferencesFactory';

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

describe('useNotificationPreferences', () => {
  let server: Server<AnyRegistry>;

  beforeEach(() => {
    // useNotificationPreferences is a singleton so we clear the state before each test
    // @todo: Reset all zustand stores before each test
    useNotificationPreferences.setState({ categories: [] });

    server = new Server({ timing: 50, environment: 'test', urlPrefix: 'https://api.magicbell.com' });
  });

  afterEach(() => {
    server.shutdown();
  });

  describe('.fetch', () => {
    it('fetches preferences from the /notification_preferences endpoint', async () => {
      const response = {
        notification_preferences: humps.decamelizeKeys(sampleNotificationPreferences),
      };
      server.get('/notification_preferences', () => {
        return new Response(200, {}, response);
      });

      // It should start out empty.
      const initiallyEmptyPreferences = useNotificationPreferences.getState();
      expect(initiallyEmptyPreferences.categories).toStrictEqual([]);

      await useNotificationPreferences.getState().fetch();

      const preferences = useNotificationPreferences.getState();
      expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>(
        sampleNotificationPreferences.categories,
      );
      expect(preferences.lastFetchedAt).toBeGreaterThan(Date.now() - 5_000);
    });
  });

  describe('.save', () => {
    it('updates preferences using the /notification_preferences endpoint', async () => {
      const response = {
        notification_preferences: humps.decamelizeKeys(sampleNotificationPreferences),
      };
      server.put('/notification_preferences', () => {
        return new Response(200, {}, response);
      });

      // It should start out empty.
      const initiallyEmptyPreferences = useNotificationPreferences.getState();
      expect(initiallyEmptyPreferences.categories).toStrictEqual([]);

      await useNotificationPreferences.getState().save(sampleNotificationPreferences);
      const preferences = useNotificationPreferences.getState();
      expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>(
        sampleNotificationPreferences.categories,
      );

      // Verify that calling this twice will not result in duplicating of data
      await useNotificationPreferences.getState().save(sampleNotificationPreferences);
      const preferences2 = useNotificationPreferences.getState();
      expect(preferences2.categories).toStrictEqual<CategoryChannelPreference[]>(
        sampleNotificationPreferences.categories,
      );
    });

    it(`updates the user preferences when they change and 
        pulls over any new changes from the server`, async () => {
      const response = {
        notification_preferences: humps.decamelizeKeys(sampleNotificationSaveResponse),
      };
      server.put('/notification_preferences', () => {
        return new Response(200, {}, response);
      });

      // It should start out empty.
      const initiallyEmptyPreferences = useNotificationPreferences.getState();
      expect(initiallyEmptyPreferences.categories).toStrictEqual([]);

      await useNotificationPreferences.getState().save(sampleNotificationPreferences);
      const preferences = useNotificationPreferences.getState();
      expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>(
        sampleNotificationSaveResponse.categories,
      );
    });
  });

  describe('error', () => {
    it('safely fetches invalid data that is empty', async () => {
      const response = {};
      server.get('/notification_preferences', () => {
        return new Response(200, {}, response);
      });

      await useNotificationPreferences.getState().fetch();
      const preferences = useNotificationPreferences.getState();
      expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
    });

    it('safely fetches an incomplete notification preferences', async () => {
      const response = {
        notification_preferences: {},
      };
      server.get('/notification_preferences', () => {
        return new Response(200, {}, response);
      });

      await useNotificationPreferences.getState().fetch();
      const preferences = useNotificationPreferences.getState();
      expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
    });
  });

  it('safely handles 500 error for fetch', async () => {
    server.get('/notification_preferences', () => {
      return new Response(500, {});
    });

    await useNotificationPreferences.getState().fetch();
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });

  it('safely handles 500 error for put', async () => {
    server.put('/notification_preferences', () => {
      return new Response(500, {});
    });

    await useNotificationPreferences.getState().save(sampleNotificationPreferences);
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });
});
