import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';

import useNotificationFactory from '../../../src/hooks/useNotificationFactory';
import * as ajax from '../../../src/lib/ajax';
import clientSettings from '../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

const server = setupMockServer(...mockHandlers);

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
    network: { cacheTTL: 0, maxRetries: 0 },
  });
});

describe('useNotificationFactory', () => {
  const json = NotificationFactory.build();

  beforeEach(() => {
    useNotificationStoresCollection.getState().setStore('default', {}, { notifications: [json] });
  });

  it('useNotificationFactory returns a notification', () => {
    const { result } = renderHook(() => useNotificationFactory(json));
    const { current: notification } = result;

    expect(notification).toMatchObject({
      id: json.id,
      title: json.title,
      content: json.content,
      category: json.category,
      actionUrl: json.actionUrl,
      customAttributes: JSON.parse(json.customAttributes),
      isRead: false,
      isSeen: true,
    });

    expect(notification.readAt).toBeNull();
    expect(notification.seenAt).toBeInstanceOf(dayjs);
    expect(notification.sentAt).toBeInstanceOf(dayjs);
    expect(notification.archivedAt).toBeInstanceOf(dayjs);

    expect(notification.delete).toBeInstanceOf(Function);
    expect(notification.markAsRead).toBeInstanceOf(Function);
    expect(notification.markAsSeen).toBeInstanceOf(Function);
  });

  it('.markAsRead marks the notification as read', async () => {
    server.intercept('post', '/notifications/:id/read', { status: 204 });

    const spy = vi.spyOn(ajax, 'postAPI');
    const { result } = renderHook(() => useNotificationFactory(json));
    const { current: notification } = result;

    await act(async () => {
      await notification.markAsRead();
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}/read`);
    spy.mockRestore();
  });

  it('.markAsUnread marks the notification as unread', async () => {
    const status = server.intercept('post', '/notifications/:id/unread', { status: 204 });
    const { result } = renderHook(() => useNotificationFactory(json));

    await act(() => result.current.markAsUnread());

    expect(status.handledRequests).toEqual(1);
    const url = new URL(status.lastRequest.url);
    expect(url.pathname).toEqual(`/notifications/${result.current.id}/unread`);
  });

  it('.delete deletes the notification', async () => {
    const status = server.intercept('delete', '/notifications/*', { status: 204 });

    const { result } = renderHook(() => useNotificationFactory(json));

    await act(async () => result.current.delete());

    expect(status.handledRequests).toEqual(1);
    const url = new URL(status.lastRequest.url);
    expect(url.pathname).toEqual(`/notifications/${result.current.id}`);
  });
});
