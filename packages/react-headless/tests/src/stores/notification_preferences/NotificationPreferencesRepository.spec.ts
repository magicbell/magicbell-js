import faker from '@faker-js/faker';
import { fake, setupMockServer } from '@magicbell/utils';
import { beforeEach } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import NotificationPreferencesRepository from '../../../../src/stores/notification_preferences/NotificationPreferencesRepository';

const server = setupMockServer();

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

it('fetches v2 of the preferences endpoint', async () => {
  const status = server.intercept('get', '/notification_preferences', {
    notification_preferences: fake.notificationPreferences,
  });

  await new NotificationPreferencesRepository().get();
  expect(status.lastRequest.headers.get('accept-version')).toEqual('v2');
});

it('returns the response in camel case', async () => {
  server.intercept('get', '/notification_preferences', {
    notification_preferences: { categories: { slug: 'email' } },
  });

  const result = await new NotificationPreferencesRepository().get();
  expect(result).toEqual({ notificationPreferences: { categories: { slug: 'email' } } });
});

it('throws an error on 403 on get', async () => {
  server.intercept('get', '/notification_preferences', { status: 403, statusText: 'Forbidden' });

  await expect(new NotificationPreferencesRepository().get()).rejects.toThrow('Request failed with status code 403');
});

it('throws an error on 403 on update', async () => {
  server.intercept('put', '/notification_preferences', { status: 403, statusText: 'Forbidden' });

  await expect(
    new NotificationPreferencesRepository().update({
      categories: [{ slug: 'new-cat', label: 'new cat', channels: [] }],
    }),
  ).rejects.toThrow('Request failed with status code 403');
});

it('returns data on update', async () => {
  server.intercept('put', '/notification_preferences', { notification_preferences: fake.notificationPreferences });

  const response = await new NotificationPreferencesRepository().update({
    categories: [{ slug: '1', label: 'one', channels: [] }],
  });

  expect(response).toEqual({ notificationPreferences: fake.notificationPreferences });
});

it('returns false on 500 on update', async () => {
  server.intercept('put', '/notification_preferences', { status: 500 });

  const response = new NotificationPreferencesRepository().update({
    categories: [{ slug: '1', label: 'one', channels: [] }],
  });

  await expect(response).rejects.toThrow('Request failed with status code 500');
});
