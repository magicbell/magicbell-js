import faker from '@faker-js/faker';
import { act, renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import { Response, Server } from 'miragejs';
import { beforeAll } from 'vitest';

import useNotificationFactory from '../../../src/hooks/useNotificationFactory';
import * as ajax from '../../../src/lib/ajax';
import clientSettings from '../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

describe('hooks', () => {
  describe('useNotificationFactory', () => {
    const json = NotificationFactory.build();

    beforeEach(() => {
      const { result } = renderHook(() => useNotificationStoresCollection());

      act(() => {
        result.current.setStore('default', {}, { notifications: [json] });
      });
    });

    it('returns a notification', () => {
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

    describe('.markAsRead', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.post('/notifications/*/read', new Response(204, {}, ''));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('marks the notification as read', async () => {
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
    });

    describe('.markAsUnread', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.post('/notifications/*/unread', new Response(204, {}, ''));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('marks the notification as unread', async () => {
        const spy = vi.spyOn(ajax, 'postAPI');
        const { result } = renderHook(() => useNotificationFactory(json));
        const { current: notification } = result;

        await act(async () => {
          await notification.markAsUnread();
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}/unread`);
        spy.mockRestore();
      });
    });

    describe('.delete', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.delete('/notifications/*', new Response(204, {}, ''));
      });

      afterEach(() => {
        server.shutdown();
      });

      it('deletes the notification', async () => {
        const spy = vi.spyOn(ajax, 'deleteAPI');
        const { result } = renderHook(() => useNotificationFactory(json));
        const { current: notification } = result;

        await act(async () => {
          await notification.delete();
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(`/notifications/${notification.id}`);
        spy.mockRestore();
      });
    });
  });
});
