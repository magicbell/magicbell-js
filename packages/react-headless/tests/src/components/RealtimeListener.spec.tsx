import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import * as React from 'react';

import RealtimeListener from '../../../src/components/RealtimeListener';
import { emitEvent } from '../../../src/lib/realtime';
import clientSettings from '../../../src/stores/clientSettings';
import { useNotificationStoresCollection } from '../../../src/stores/notifications';
import NotificationFactory from '../../factories/NotificationFactory';

const server = setupMockServer(...mockHandlers);

beforeAll(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
    network: { cacheTTL: 0, maxRetries: 0 },
  });
});

const RealtimeComponent = () => {
  const collection = useNotificationStoresCollection();
  React.useLayoutEffect(() => {
    collection.setStore('default', {}, { unreadCount: 1, unseenCount: 1 });
    // Adding collection to the deps, will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RealtimeListener />;
};

it('fetches notifications on connect', async () => {
  const spy = server.intercept('get', '/notifications');
  render(<RealtimeComponent />);
  emitEvent('reconnected', null, 'local');

  await waitFor(() => {
    const params = new URL(spy.lastRequest.url).searchParams;
    expect(params.get('page')).toEqual('1');
  });
});

it('fetches notifications on notifications.new', async () => {
  const spy = server.intercept('get', '/notifications');
  render(<RealtimeComponent />);
  emitEvent('notifications.new', { id: 'uuid' }, 'remote');

  await waitFor(() => {
    const params = new URL(spy.lastRequest.url).searchParams;
    expect(params.get('page')).toEqual('1');
  });
});

it('prepends the new notifications', async () => {
  const notification = NotificationFactory.build();
  server.intercept('get', '/notifications', { notifications: [notification] });

  render(<RealtimeComponent />);
  const { result } = renderHook(() => useNotificationStoresCollection());

  emitEvent('notifications.new', notification, 'remote');

  await waitFor(() => {
    expect(result.current.stores['default'].notifications[0]).toEqual(notification);
  });
});

it('notifications.seen.all resets the unseen count', async () => {
  render(<RealtimeComponent />);
  const { result } = renderHook(() => useNotificationStoresCollection());

  act(() => {
    emitEvent('notifications.seen.all', null, 'remote');
  });

  await waitFor(() => {
    expect(result.current.stores['default'].unseenCount).toBe(0);
  });
});

it('notifications.seen.all does not make a post request to avoid infinite loops', async () => {
  const spy = server.intercept('post', '/notifications');
  render(<RealtimeComponent />);

  act(() => {
    emitEvent('notifications.seen.all', null, 'remote');
  });

  await waitFor(() => {
    expect(spy.handledRequests).toEqual(0);
  });
});

it('notifications.read.all marks all notifications as read', async () => {
  render(<RealtimeComponent />);
  const { result } = renderHook(() => useNotificationStoresCollection());

  act(() => {
    emitEvent('notifications.read.all', null, 'remote');
  });

  await waitFor(() => {
    for (const model of result.current.stores['default'].notifications) {
      expect(model.readAt).toBeDefined();
    }
  });
});

it('notifications.read.all does not make a post request to avoid infinite loops', async () => {
  const spy = server.intercept('post', '/notifications');
  render(<RealtimeComponent />);

  act(() => {
    emitEvent('notifications.read.all', null, 'remote');
  });

  await waitFor(() => {
    expect(spy.handledRequests).toEqual(0);
  });
});

it('notifications.read fetches notifications', async () => {
  const spy = server.intercept('get', '/notifications');
  render(<RealtimeComponent />);

  act(() => {
    emitEvent('notifications.read', { id: 'uuid' }, 'remote');
  });

  await waitFor(() => {
    const params = new URL(spy.lastRequest.url).searchParams;
    expect(params.get('page')).toEqual('1');
  });
});

it('notifications.unread fetches notifications', async () => {
  const spy = server.intercept('get', '/notifications');
  render(<RealtimeComponent />);

  act(() => {
    emitEvent('notifications.unread', { id: 'uuid' }, 'remote');
  });

  await waitFor(() => {
    const params = new URL(spy.lastRequest.url).searchParams;
    expect(params.get('page')).toEqual('1');
  });
});

it('notifications.delete removes the notification from the store', async () => {
  server.intercept('get', '/notifications', { notifications: [] });
  render(<RealtimeComponent />);
  const { result } = renderHook(() => useNotificationStoresCollection());
  const notification = NotificationFactory.build();

  act(() => {
    emitEvent('notifications.delete', { id: notification.id }, 'remote');
  });

  await waitFor(() => {
    expect(result.current.stores['default'].notifications).not.toEqual(expect.arrayContaining([notification]));
  });
});

it('notifications.delete does not remove anything from the store that doesnt exist', async () => {
  render(<RealtimeComponent />);
  const { result } = renderHook(() => useNotificationStoresCollection());
  const notification = NotificationFactory.build();

  act(() => {
    emitEvent('notifications.delete', { id: notification.id }, 'remote');
  });

  await waitFor(() => {
    expect(result.current.stores['default'].total).toBe(0);
    expect(result.current.stores['default'].notifications).toHaveLength(0);
  });
});

const makeListener = () => ({
  forEach: vi.fn().mockReturnValue(new Promise(() => {})),
  close: vi.fn(),
});

describe('RealtimeListener visibility', () => {
  let listenMock: ReturnType<typeof makeListener>;
  let client: { listen: () => ReturnType<typeof makeListener> };
  let fetchAllSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    listenMock = makeListener();
    client = { listen: vi.fn(() => listenMock) };

    clientSettings.setState({
      apiKey: 'fake-key',
      userEmail: 'user@example.com',
      getClient: () => client,
    } as any);

    fetchAllSpy = vi.fn().mockResolvedValue(undefined);
    useNotificationStoresCollection.setState({ fetchAllStores: fetchAllSpy } as any);

    Object.defineProperty(document, 'hidden', { value: false, configurable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('connects and disconnects with visibility changes', () => {
    render(<RealtimeListener />);
    expect(client.listen).toHaveBeenCalledTimes(1);

    act(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(listenMock.close).toHaveBeenCalledTimes(1);

    act(() => {
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(client.listen).toHaveBeenCalledTimes(2);
    expect(fetchAllSpy).toHaveBeenCalledWith({ page: 1 }, { reset: true });
  });

  test('focus refresh is throttled', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(20000));
    render(<RealtimeListener />);
    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(fetchAllSpy).toHaveBeenCalledWith({ page: 1 }, { prepend: true });

    vi.setSystemTime(new Date(25000));
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(fetchAllSpy).toHaveBeenCalledTimes(1);

    vi.setSystemTime(new Date(40000));
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(fetchAllSpy).toHaveBeenCalledTimes(2);
  });

  test('focus refresh does not run while hidden', async () => {
    render(<RealtimeListener />);
    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    expect(fetchAllSpy).not.toHaveBeenCalled();
  });
});
