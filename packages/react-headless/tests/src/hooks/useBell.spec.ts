import faker from '@faker-js/faker';
import { setupMockServer } from '@magicbell/utils';
import { act, renderHook } from '@testing-library/react-hooks';

import useBell from '../../../src/hooks/useBell';
import clientSettings from '../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

const server = setupMockServer();

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });

  const { result } = renderHook(() => useNotificationStoresCollection());
  const notifications = NotificationFactory.buildList(3, { seenAt: null });
  result.current?.setStore('default', {}, { notifications });
});

test('returns the store with props and helper methods', () => {
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

test('returns null when store with given ID does not exist', () => {
  const { result } = renderHook(() => useBell({ storeId: 'non-existing' }));
  expect(result.current).toBeNull();
});

test('markAllAsSeen makes a request to the server', async () => {
  const status = server.intercept('post', '/notifications/seen', { status: 204 });
  const { result } = renderHook(() => useBell());

  await act(() => result.current?.markAllAsSeen());
  expect(status.lastRequest).toBeNull();
});

test('markAllAsSeen does not mark any notifications as seen', async () => {
  const { result } = renderHook(() => useBell());

  await act(() => result.current?.markAllAsSeen());

  const store = result.current;
  expect(store?.notifications[0].seenAt).toBeNull();
  expect(store?.notifications[1].seenAt).toBeNull();
  expect(store?.notifications[2].seenAt).toBeNull();
});

test('does not make a request to the server of there are no unseen notifications', async () => {
  const status = server.intercept('post', '/notifications/seen', { status: 204 });

  const { result } = renderHook(() => useBell());

  await act(() => result.current?.markAllAsSeen());
  expect(status.lastRequest).toBeNull();
});
