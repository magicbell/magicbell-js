import faker from 'faker';
import humps from 'humps';
import { Response, Server } from 'miragejs';

import NotificationRepository from '../../../../src/stores/notifications/NotificationRepository';
import NotificationFactory from '../../../factories/NotificationFactory';

describe('stores', () => {
  describe('notifications', () => {
    describe('NotificationRepository', () => {
      let repo: NotificationRepository;
      let server;

      beforeEach(() => {
        repo = new NotificationRepository();
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
      });

      afterEach(() => {
        server.shutdown();
      });

      describe('.get', () => {
        describe('successful response', () => {
          it('returns the response in camel case', async () => {
            const notification = NotificationFactory.build();
            server.get(`/notifications/${notification.id}`, {
              notification: humps.decamelizeKeys(notification),
            });

            const response = await repo.get(notification.id);

            expect(response).toEqual({ notification });
          });
        });

        describe('error handling', () => {
          it('throws an error', async () => {
            const notification = NotificationFactory.build();
            server.get(`/notifications/${notification.id}`, new Response(403, {}, {}));
            expect.hasAssertions();

            await expect(() => repo.get(notification.id)).rejects.toThrow('Request failed with status code 403');
          });
        });
      });

      describe('.findBy', () => {
        describe('successful response', () => {
          it('returns the response in camel case', async () => {
            const response = {
              total: 5,
              currentPage: 1,
              perPage: 15,
              totalPages: 1,
              projectId: 7,
              unseenCount: 3,
              unreadCount: 2,
              notifications: NotificationFactory.buildList(5),
            };
            server.get('/notifications', humps.decamelizeKeys(response));

            const json = await repo.findBy({});

            expect(json).toEqual(response);
          });
        });

        describe('error handling', () => {
          it('throws an error', async () => {
            server.get('/notifications', new Response(403, {}, {}));
            expect.hasAssertions();

            await expect(() => repo.findBy({ unread: true })).rejects.toThrow('Request failed with status code 403');
          });
        });
      });

      describe('.delete', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            const notificationId = faker.datatype.uuid();
            server.delete(`/notifications/${notificationId}`, new Response(204, {}, ''));
            const response = await repo.delete(notificationId);

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
            const notificationId = faker.datatype.uuid();
            server.delete(`/notifications/${notificationId}`, new Response(500, {}, ''));
            const response = await repo.delete(notificationId);

            expect(response).toBe(false);
          });
        });
      });

      describe('.markAsRead', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            const notificationId = faker.datatype.uuid();
            server.post(`/notifications/${notificationId}/read`, new Response(204, {}, ''));
            const response = await repo.markAsRead(notificationId);

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
            const notificationId = faker.datatype.uuid();
            server.post(`/notifications/${notificationId}/read`, new Response(500, {}, ''));
            const response = await repo.markAsRead(notificationId);

            expect(response).toBe(false);
          });
        });
      });

      describe('.markAsUnread', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            const notificationId = faker.datatype.uuid();
            server.post(`/notifications/${notificationId}/unread`, new Response(204, {}, ''));
            const response = await repo.markAsUnread(notificationId);

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
            const notificationId = faker.datatype.uuid();
            server.post(`/notifications/${notificationId}/unread`, new Response(500, {}, {}));
            const response = await repo.markAsUnread(notificationId);

            expect(response).toBe(false);
          });
        });
      });

      describe('.markAllAsSeen', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            server.post('/notifications/seen', new Response(204, {}, ''));
            const response = await repo.markAllAsSeen();

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
            server.post('/notifications/seen', new Response(500, {}, {}));
            const response = await repo.markAllAsSeen();

            expect(response).toBe(false);
          });
        });
      });

      describe('.markAllAsRead', () => {
        describe('successful response', () => {
          it('returns true', async () => {
            server.post('/notifications/read', new Response(204, {}, ''));
            const response = await repo.markAllAsRead();

            expect(response).toBe(true);
          });
        });

        describe('error handling', () => {
          it('returns false', async () => {
            server.post('/notifications/read', new Response(500, {}, {}));
            const response = await repo.markAllAsRead();

            expect(response).toBe(false);
          });
        });
      });
    });
  });
});
