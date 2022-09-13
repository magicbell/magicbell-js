import { Response, Server } from 'miragejs';

import { Notification, NotificationStoreWithContext } from '../../../src';
import NotificationFactory from '../../factories/NotificationFactory';

describe('stores', () => {
  describe('NotificationStoreWithContext', () => {
    let store: NotificationStoreWithContext;

    beforeEach(() => {
      store = new NotificationStoreWithContext({});
    });

    describe('.handleNotificationChange', () => {
      describe('the notification is deleted', () => {
        it('removes the notification from the store', () => {
          const notification = new Notification(NotificationFactory.build({ deletedAt: Date.now() }));
          store.push(notification);
          store.handleNotificationChange(notification);

          expect(store.isEmpty).toBe(true);
        });
      });

      describe('the notification satifies the context', () => {
        it('add the notification to the store', () => {
          const notification = new Notification(NotificationFactory.build());
          store.handleNotificationChange(notification);

          expect(store.isEmpty).toBe(false);
        });
      });
    });

    describe('.removeUnlessMatchesContext', () => {
      describe('the notification does not match the context', () => {
        let notification: Notification;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build({ readAt: null, seenAt: null }));

          store = new NotificationStoreWithContext({ read: false });
          store.push(notification);
        });

        it('removes the notification', () => {
          notification.isRead = true;
          store.removeUnlessMatchesContext(notification);

          expect(store.items).not.toContain(notification);
        });

        it('changes the unread count of the notifications store', () => {
          expect(store.unreadCount).toBe(1);

          notification.isRead = true;
          store.removeUnlessMatchesContext(notification);

          expect(store.unreadCount).toBe(0);
        });

        it('changes the unseen count of the notifications store', () => {
          expect(store.unseenCount).toBe(1);

          notification.isRead = true;
          store.removeUnlessMatchesContext(notification);

          expect(store.unseenCount).toBe(0);
        });
      });

      describe('the notification matches the context', () => {
        let notification: Notification;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build());

          store = new NotificationStoreWithContext({ seen: true });
          store.push(notification);
        });

        it('does not remove the notification', () => {
          notification.isSeen = true;
          store.removeUnlessMatchesContext(notification);

          expect(store.items).toContain(notification);
        });
      });

      describe('the notification is deleted', () => {
        let notification: Notification;
        let server;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build({ readAt: null, seenAt: null }));

          server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
          server.delete(`/notifications/${notification.id}`, new Response(204, {}, ''));

          store = new NotificationStoreWithContext({ read: false });
          store.push(notification);
        });

        afterEach(() => {
          server.shutdown();
        });

        it('removes the notification', async () => {
          await notification.delete();
          store.removeUnlessMatchesContext(notification);

          expect(store.items).not.toContain(notification);
        });
      });
    });

    describe('.addIfMatchesContext', () => {
      describe('the notification does not match the context', () => {
        let notification: Notification;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build({ readAt: new Date() }));
          store = new NotificationStoreWithContext({ read: false });
        });

        it('does not add the notification', () => {
          store.addIfMatchesContext(notification);
          expect(store.items).not.toContain(notification);
        });
      });

      describe('the notification matches the context', () => {
        let notification: Notification;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build());
          store = new NotificationStoreWithContext({ read: false });
        });

        it('adds the notification', () => {
          store.addIfMatchesContext(notification);
          expect(store.items).toContain(notification);
        });
      });

      describe('the notification is deleted', () => {
        let notification: Notification;
        let server;

        beforeEach(() => {
          notification = new Notification(NotificationFactory.build({ readAt: null, seenAt: null }));

          server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
          server.delete(`/notifications/${notification.id}`, new Response(204, {}, ''));

          store = new NotificationStoreWithContext({ read: false });
        });

        afterEach(() => {
          server.shutdown();
        });

        it('does not add the notification', async () => {
          await notification.delete();
          store.addIfMatchesContext(notification);

          expect(store.items).not.toContain(notification);
        });
      });
    });

    describe('.fetch', () => {
      let server;

      beforeEach(() => {
        store = new NotificationStoreWithContext({ read: true, seen: false });

        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
          trackRequests: true,
        });

        server.get('/notifications', {
          total: 2,
          per_page: 15,
          page: 1,
          notifications: NotificationFactory.buildList(2),
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches with the context as the query params', async () => {
        await store.fetch({ page: 2 });

        const requests = server.pretender.handledRequests;
        expect(requests[0].queryParams).toEqual({ read: 'true', seen: 'false', page: '2' });
      });
    });

    describe('.fetchNextPage', () => {
      let server;

      beforeEach(() => {
        store = new NotificationStoreWithContext({ read: false, seen: true });

        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
          trackRequests: true,
        });

        server.get('/notifications', {
          total: 2,
          per_page: 15,
          page: 1,
          notifications: NotificationFactory.buildList(2),
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches with the context as the query params', async () => {
        await store.fetchNextPage({ title: 'Lorem ipsum dolor' });

        const requests = server.pretender.handledRequests;
        expect(requests[0].queryParams).toEqual({ read: 'false', seen: 'true', page: '2', title: 'Lorem ipsum dolor' });
      });
    });

    describe('.fetchAndReset', () => {
      let server;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          urlPrefix: 'https://api.magicbell.com',
          timing: 50,
          trackRequests: true,
        });

        server.get('/notifications', {
          total: 2,
          per_page: 15,
          page: 1,
          notifications: NotificationFactory.buildList(2),
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('fetches the first page with the context as the query params', async () => {
        await store.fetchAndReset({ title: 'Lorem ipsum dolor' });

        const requests = server.pretender.handledRequests;
        expect(requests[0].queryParams).toEqual({ page: '1', title: 'Lorem ipsum dolor' });
      });

      it('resets the collection', async () => {
        const spy = vi.spyOn(store, 'fetch');
        await store.fetchAndReset({ title: 'Lorem ipsum dolor' });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ page: 1, title: 'Lorem ipsum dolor' }, { reset: true });
        spy.mockRestore();
      });
    });

    describe('.notifications', () => {
      it('returns the store items', () => {
        expect(store.notifications).toBe(store.items);
      });
    });
  });
});
