import { setupMockServer } from '@magicbell/utils';
import { beforeEach } from 'vitest';

import clientSettings from '../../../../src/stores/clientSettings';
import NotificationRepository from '../../../../src/stores/notifications/NotificationRepository';

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: 'person@example.com',
  });
});

const server = setupMockServer();

test('get returns the result in camel case', async () => {
  server.intercept('get', '/notifications/1', { status: 200, json: { notification: { category_slug: 'email' } } });

  const notification = new NotificationRepository().get('1');
  await expect(notification).resolves.toEqual({ notification: { categorySlug: 'email' } });
});

test('get throws an error on failure', async () => {
  server.intercept('get', '/notifications/1', { status: 403 });

  const notification = new NotificationRepository().get('1');
  await expect(notification).rejects.toThrow('Request failed with status code 403');
});

test('findBy returns the result in camel case', async () => {
  server.intercept('get', '/notifications', { status: 200, json: { notification: { category_slug: 'email' } } });

  const notification = new NotificationRepository().findBy({ read: false });
  await expect(notification).resolves.toEqual({ notification: { categorySlug: 'email' } });
});

test('findBy throws an error on failure', async () => {
  server.intercept('get', '/notifications', { status: 403 });

  const notification = new NotificationRepository().findBy({ read: false });
  await expect(notification).rejects.toThrow('Request failed with status code 403');
});

test('delete returns true on success', async () => {
  server.intercept('delete', '/notifications/1', { status: 204 });

  const action = new NotificationRepository().delete('1');
  await expect(action).resolves.toEqual(true);
});

test('delete returns false on failure', async () => {
  server.intercept('delete', '/notifications/1', { status: 500 });

  const action = new NotificationRepository().delete('1');
  await expect(action).resolves.toEqual(false);
});

test('markAsRead returns true on success', async () => {
  server.intercept('post', '/notifications/:id/read', { status: 204 });

  const action = new NotificationRepository().markAsRead('1');
  await expect(action).resolves.toEqual(true);
});

test('markAsRead returns false on failure', async () => {
  server.intercept('post', '/notifications/:id/read', { status: 500 });

  const action = new NotificationRepository().markAsRead('1');
  await expect(action).resolves.toEqual(false);
});

test('markAsUnread returns true on success', async () => {
  server.intercept('post', '/notifications/:id/unread', { status: 204 });

  const action = new NotificationRepository().markAsUnread('1');
  await expect(action).resolves.toEqual(true);
});

test('markAsUnread returns false on failure', async () => {
  server.intercept('post', '/notifications/:id/unread', { status: 500 });

  const action = new NotificationRepository().markAsUnread('1');
  await expect(action).resolves.toEqual(false);
});

test('markAllAsSeen returns true on success', async () => {
  server.intercept('post', '/notifications/seen', { status: 204 });

  const action = new NotificationRepository().markAllAsSeen();
  await expect(action).resolves.toEqual(true);
});

test('markAllAsSeen returns false on failure', async () => {
  server.intercept('post', '/notifications/seen', { status: 500 });

  const action = new NotificationRepository().markAllAsSeen();
  await expect(action).resolves.toEqual(false);
});

test('markAllAsRead returns true on success', async () => {
  server.intercept('post', '/notifications/read', { status: 204 });

  const action = new NotificationRepository().markAllAsRead();
  await expect(action).resolves.toEqual(true);
});

test('markAllAsRead returns false on failure', async () => {
  server.intercept('post', '/notifications/read', { status: 500 });

  const action = new NotificationRepository().markAllAsRead();
  await expect(action).resolves.toEqual(false);
});
