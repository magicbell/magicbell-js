import faker from '@faker-js/faker';
import { fake, setupMockServer } from '@magicbell/utils';
import { act } from '@testing-library/react-hooks';
import * as humps from 'humps';
import { beforeEach } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import useNotificationPreferences from '../../../../src/stores/notification_preferences';
import { CategoryChannelPreference } from '../../../../src/types/IRemoteNotificationPreferences';
import { sampleNotificationPreferences } from '../../../factories/NotificationPreferencesFactory';

const server = setupMockServer();

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });

  // useNotificationPreferences is a singleton so we clear the state before each test
  useNotificationPreferences.setState({ categories: [] });
});

describe('useNotificationPreferences', () => {
  it('fetches preferences from the /notification_preferences endpoint', async () => {
    server.intercept('get', '/notification_preferences', {
      notification_preferences: fake.notificationPreferences,
    });

    // It should start out empty.
    expect(useNotificationPreferences.getState().categories).toStrictEqual([]);

    await act(() => useNotificationPreferences.getState().fetch());

    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual(humps.camelizeKeys(fake.notificationPreferences.categories));
    expect(preferences.lastFetchedAt).toBeGreaterThan(Date.now() - 5_000);
  });

  it('updates preferences using the /notification_preferences endpoint', async () => {
    server.intercept('put', '/notification_preferences', {
      status: 200,
      json: {
        notification_preferences: fake.notificationPreferences,
      },
    });

    // It should start out empty.
    expect(useNotificationPreferences.getState().categories).toStrictEqual([]);

    await act(() => useNotificationPreferences.getState().save(sampleNotificationPreferences));
    expect(useNotificationPreferences.getState().categories).toStrictEqual(
      humps.camelizeKeys(fake.notificationPreferences.categories),
    );

    // Verify that calling this twice will not result in duplicating of data
    await act(() => useNotificationPreferences.getState().save(sampleNotificationPreferences));
    expect(useNotificationPreferences.getState().categories).toStrictEqual(
      humps.camelizeKeys(fake.notificationPreferences.categories),
    );
  });

  it('safely fetches invalid data that is empty', async () => {
    server.intercept('put', '/notification_preferences', {
      status: 200,
      json: {},
    });

    await useNotificationPreferences.getState().fetch();
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });

  it('safely fetches an incomplete notification preferences', async () => {
    server.intercept('put', '/notification_preferences', {
      status: 200,
      json: { notification_preferences: {} },
    });

    await useNotificationPreferences.getState().fetch();
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });

  it('safely handles 500 error for fetch', async () => {
    server.intercept('put', '/notification_preferences', { status: 500 });

    await useNotificationPreferences.getState().fetch();
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });

  it('safely handles 500 error for put', async () => {
    server.intercept('put', '/notification_preferences', { status: 500 });

    await useNotificationPreferences.getState().save(sampleNotificationPreferences);
    const preferences = useNotificationPreferences.getState();
    expect(preferences.categories).toStrictEqual<CategoryChannelPreference[]>([]);
  });
});
