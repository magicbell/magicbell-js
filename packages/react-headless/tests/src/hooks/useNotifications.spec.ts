import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, renderHook } from '@testing-library/react';

import useNotifications from '../../../src/hooks/useNotifications';
import * as ajax from '../../../src/lib/ajax';
import clientSettings from '../../../src/stores/clientSettings';
import useConfig from '../../../src/stores/config';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';

setupMockServer(...mockHandlers);

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
    apiClientCacheTTL: 0,
  });
});

describe('hooks', () => {
  describe('useNotifications', () => {
    describe('a store with the given ID exists', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useNotificationStoresCollection());

        act(() => {
          // @TODO: Rest all stores after specs
          useConfig.setState({ lastFetchedAt: undefined });
          result.current.setStore('default', {});
          result.current.setStore('archive', { read: true });
        });
      });

      it('returns the store', () => {
        const { result } = renderHook(() => useNotifications());

        expect(result.current).toBeDefined();
        expect(result.current?.context).toBeDefined();
        expect(result.current?.total).toBeDefined();
        expect(result.current?.totalPages).toBeDefined();
        expect(result.current?.currentPage).toBeDefined();
        expect(result.current?.perPage).toBeDefined();
        expect(result.current?.notifications).toBeDefined();
        expect(result.current?.isEmpty).toBeDefined();
        expect(result.current?.hasNextPage).toBeDefined();
        expect(result.current?.fetch).toBeDefined();
        expect(result.current?.markAllAsRead).toBeDefined();
        expect(result.current?.markAllAsSeen).toBeDefined();
      });

      describe('config is fetched', () => {
        it('fetches the store', () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');
          renderHook(() => useNotifications());

          act(() => {
            useConfig.setState({ lastFetchedAt: Date.now() });
          });

          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });
          spy.mockRestore();
        });

        it('fetches the other store when storeId changes', async () => {
          const spy = jest.spyOn(ajax, 'fetchAPI');
          const { rerender } = renderHook(({ storeId }) => useNotifications(storeId), {
            initialProps: { storeId: 'default' },
          });

          act(() => {
            useConfig.setState({ lastFetchedAt: Date.now() });
          });

          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith('/notifications', { page: 1 });

          rerender({ storeId: 'archive' });
          expect(spy).toHaveBeenCalled();
          expect(spy).toHaveBeenLastCalledWith('/notifications', { page: 1, read: true });

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
      it('returns null', () => {
        const { result } = renderHook(() => useNotifications('non-existing'));
        expect(result.current).toBeNull();
      });
    });
  });
});
