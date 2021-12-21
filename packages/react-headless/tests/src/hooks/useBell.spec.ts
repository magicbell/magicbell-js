import { act, renderHook } from '@testing-library/react-hooks';
import { Response, Server } from 'miragejs';

import useBell from '../../../src/hooks/useBell';
import * as ajax from '../../../src/lib/ajax';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

describe('hooks', () => {
  describe('useBell', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useNotificationStoresCollection());
      const notifications = NotificationFactory.buildList(3, { seenAt: null });

      act(() => {
        result.current?.setStore('default', {}, { notifications });
      });
    });

    describe('a store with the given ID exists', () => {
      it('returns the store', () => {
        const { result } = renderHook(() => useBell());

        expect(result.current).toBeDefined();
        expect(result.current?.context).toBeDefined();
        expect(result.current?.total).toBeDefined();
        expect(result.current?.totalPages).toBeDefined();
        expect(result.current?.currentPage).toBeDefined();
        expect(result.current?.perPage).toBeDefined();
        expect(result.current?.notifications).toBeDefined();
        expect(result.current?.fetch).toBeDefined();
        expect(result.current?.markAllAsRead).toBeDefined();
        expect(result.current?.markAllAsSeen).toBeDefined();
      });
    });

    describe('there is not store with the given ID', () => {
      it('returns null', () => {
        const { result } = renderHook(() => useBell({ storeId: 'non-existing' }));
        expect(result.current).toBeNull();
      });
    });

    describe('.markAllAsSeen', () => {
      let server;

      beforeEach(() => {
        server = new Server({ environment: 'test', urlPrefix: 'https://api.magicbell.com', timing: 50 });
        server.get('/notifications', { total: 0, notifications: [] });
        server.post('/notifications/seen', new Response(204, {}, ''));
      });

      afterEach(() => {
        server.shutdown();
      });

      describe('the store has unseen notifications', () => {
        beforeEach(() => {
          const { result } = renderHook(() => useNotificationStoresCollection());
          const notifications = NotificationFactory.buildList(3, { seenAt: null });

          act(() => {
            result.current?.setStore('default', {}, { unseenCount: 3, notifications });
          });
        });

        it('makes a request to the server', async () => {
          const spy = jest.spyOn(ajax, 'postAPI');
          const { result } = renderHook(() => useBell());

          await act(async () => {
            await result.current?.markAllAsSeen();
          });

          expect(spy).toHaveBeenCalledTimes(1);
          spy.mockRestore();
        });

        it('does not mark any notifications as seen', async () => {
          const { result } = renderHook(() => useBell());

          await act(async () => {
            await result.current?.markAllAsSeen();
          });

          const store = result.current;

          expect(store?.notifications[0].seenAt).toBeNull();
          expect(store?.notifications[1].seenAt).toBeNull();
          expect(store?.notifications[2].seenAt).toBeNull();
        });
      });

      describe('the store does not have unseen notifications', () => {
        it('does not make a request to the server', async () => {
          const spy = jest.spyOn(ajax, 'postAPI');
          const { result } = renderHook(() => useBell());

          await act(async () => {
            await result.current?.markAllAsSeen();
          });

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });
    });
  });
});
