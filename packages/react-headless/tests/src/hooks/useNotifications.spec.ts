import { act, renderHook } from '@testing-library/react-hooks';
import useNotifications from '../../../src/hooks/useNotifications';
import * as ajax from '../../../src/lib/ajax';
import useConfig from '../../../src/stores/config';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';

describe('hooks', () => {
  describe('useNotifications', () => {
    describe('a store with the given ID exists', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useNotificationStoresCollection());

        act(() => {
          // @TODO: Rest all stores after specs
          useConfig.setState({ lastFetchedAt: undefined });
          result.current.setStore('default', {});
        });
      });

      it('returns the store', () => {
        const { result } = renderHook(() => useNotifications());

        expect(result.current.context).toBeDefined();
        expect(result.current.total).toBeDefined();
        expect(result.current.totalPages).toBeDefined();
        expect(result.current.currentPage).toBeDefined();
        expect(result.current.perPage).toBeDefined();
        expect(result.current.notifications).toBeDefined();
        expect(result.current.fetch).toBeDefined();
        expect(result.current.markAllAsRead).toBeDefined();
        expect(result.current.markAllAsSeen).toBeDefined();
      });

      describe('config is fetched', () => {
        it('fetches the store', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');
          renderHook(() => useNotifications());

          act(() => {
            useConfig.setState({ lastFetchedAt: Date.now() });
          });

          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });
      });

      describe('config is not fetched', () => {
        it('does not fetch the store', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');
          renderHook(() => useNotifications());

          expect(spy).not.toHaveBeenCalled();
          spy.mockRestore();
        });
      });
    });

    describe('there is not store with the given ID', () => {
      it('throws an error', () => {
        expect.hasAssertions();

        expect(() => {
          const { result } = renderHook(() => useNotifications('non-existing'));
          return result.current;
        }).toThrow(`Store not found. Define a store with the non-existing ID`);
      });
    });
  });
});
