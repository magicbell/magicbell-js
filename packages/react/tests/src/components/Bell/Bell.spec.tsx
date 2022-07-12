import {
  buildStore,
  useConfig,
  useNotification,
  useNotificationStoresCollection,
} from '@magicbell/react-headless';
import { act, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Bell from '../../../../src/components/Bell';
import { defaultTheme } from '../../../../src/context/Theme';
import { renderWithProviders as render } from '../../../__utils__/render';
import { createServer } from '../../../__utils__/server';
import { sampleNotification } from '../../../factories/NotificationFactory';

let server: ReturnType<typeof createServer>;

beforeEach(() => {
  server = createServer();
});

afterEach(() => {
  server.shutdown();
});

test('renders the notification button', () => {
  render(<Bell onClick={jest.fn()} />);
  screen.getByRole('button', { name: /notifications/i });
});

test('the notification button has a namespaced data attribute', () => {
  render(<Bell onClick={jest.fn()} />);
  const button = screen.getByRole('button', { name: /notifications/i });
  expect(button).toHaveAttribute('data-magicbell-bell');
});

test('does not render the notification count if there are no notifications', () => {
  useConfig.setState({ lastFetchedAt: undefined });

  render(<Bell onClick={jest.fn()} />);
  expect(screen.queryByRole('status', { name: /1 unread items/i })).not.toBeInTheDocument();
});

test('renders the number of notifications if there are some', async () => {
  render(<Bell onClick={jest.fn()} />);

  act(() => {
    useNotificationStoresCollection.setState({
      stores: { default: buildStore({ unseenCount: 1 }) },
    });
  });

  await waitFor(() => screen.getByRole('status', { name: /1 unread items/i }));
});

test('shows the number of unread notifications if counter is set to unread', async () => {
  render(<Bell onClick={jest.fn()} counter="unread" />);

  act(() => {
    useNotificationStoresCollection.setState({
      stores: { default: buildStore({ unreadCount: 2 }) },
    });
  });

  await waitFor(() => screen.getByRole('status', { name: /2 unread items/i }));
});

test('can render the bell icon with the custom color and size', () => {
  const theme = { ...defaultTheme, icon: { borderColor: 'red', width: '14px' } };
  render(<Bell onClick={jest.fn()} />, { theme });
  const button = screen.getByRole('button', { name: /notifications/i });
  const icon = button.querySelector('svg');
  expect(icon).toHaveAttribute('fill', 'red');
});

test('calls the onClick callback when the button is clicked', async () => {
  const onClick = jest.fn();
  render(<Bell onClick={onClick} />);

  const button = screen.getByRole('button', { name: /notifications/i });
  await userEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith();
});

test('marks all notifications as seen', async () => {
  const onClick = jest.fn();
  render(<Bell onClick={onClick} />);

  const button = screen.getByRole('button', { name: /notifications/i });
  await userEvent.click(button);

  const { result } = renderHook(() => useNotification({ ...sampleNotification, seenAt: null }));

  await userEvent.click(button);
  expect(result.current.seenAt).toBeDefined();
});
