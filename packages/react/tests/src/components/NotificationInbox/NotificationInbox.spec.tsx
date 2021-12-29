import { useConfig } from '@magicbell/react-headless';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';

import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import NotificationInbox from '../../../../src/components/NotificationInbox';
import { renderWithProviders as render } from '../../../__utils__/render';
import ConfigFactory, { sampleConfig } from '../../../factories/ConfigFactory';
import { emptyNotificationPage, sampleNotification } from '../../../factories/NotificationFactory';

let server;

beforeEach(() => {
  useConfig.setState({ ...sampleConfig, lastFetchedAt: Date.now() });

  server = new Server({
    environment: 'test',
    urlPrefix: 'https://api.magicbell.com',
    timing: 50,
    trackRequests: true,
  });

  server.get('/notifications', {
    ...emptyNotificationPage,
    total: 1,
    unseen_count: 1,
    unread_count: 1,
    notifications: [sampleNotification],
  });
  server.post('/notifications/read', () => new Response(204, {}, ''));
  server.post('/notifications/*/read', () => new Response(204, {}, ''));

  server.get('/notification_preferences', {
    notification_preferences: {
      categories: {
        comment: { email: false },
        new_message: { email: false },
        _replies: { in_app: true, web_push: true },
      },
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test('renders a header, the list of notifications and a footer if the notifications are fetched', async () => {
  render(<NotificationInbox height={300} />);

  const requests = server.pretender.handledRequests;
  expect(requests[0].queryParams).toMatchObject({ page: '1' });

  // header
  screen.getByRole('heading', { name: /NOTIFICATIONS/ });

  // notification
  await waitFor(() => screen.getByText(/This is a good content/));

  // footer
  screen.getByRole('button', { name: /Notification preferences/ });
});

test('renders nothing if the notification store does not exist', () => {
  const { container } = render(
    <MagicBellProvider apiKey="">
      <NotificationInbox height={300} storeId="non-existing" />
    </MagicBellProvider>,
  );

  expect(container.textContent).toEqual('');
});

test('clicking the mark-all-read button invokes the onAllRead callback', () => {
  const onAllRead = jest.fn();

  render(<NotificationInbox onAllRead={onAllRead} height={300} />);

  const button = screen.getByRole('button', { name: /Mark All Read/ });
  userEvent.click(button);

  expect(onAllRead).toHaveBeenCalledTimes(1);
});

test('renders a message and a image if there are no notifications', async () => {
  server.get('/notifications', emptyNotificationPage);

  render(<NotificationInbox />);

  await waitFor(() => screen.getByText(/We'll let you know when there's more./));
  screen.getByRole('img', { name: /No notifications/ });
});

test('can render with a custom no-notifications placeholder if there are no notifications', async () => {
  server.get('/notifications', emptyNotificationPage);

  const EmptyInboxPlaceholder = () => <div data-testid="empty-inbox-placeholder" />;
  render(<NotificationInbox EmptyInboxPlaceholder={EmptyInboxPlaceholder} />, { locale: 'en' });

  await waitFor(() => screen.findByTestId('empty-inbox-placeholder'));
  expect(screen.queryByText(/We'll let you know when there's more./)).not.toBeInTheDocument();
  expect(screen.queryByRole('img', { name: /No notifications/ })).not.toBeInTheDocument();
});

test('can render the inbox in Spanish', () => {
  render(<NotificationInbox />, { locale: 'es' });
  screen.getByRole('heading', { name: /NOTIFICACIONES/ });
  screen.getByRole('button', { name: /Marcar todo como leído/ });
  screen.getByRole('button', { name: /Preferencias/ });
});

test('invokes the onAllRead callback when clicking the `mark all read` button', async () => {
  const onAllRead = jest.fn();
  render(<NotificationInbox onAllRead={onAllRead} />, { locale: 'en' });

  const markAllReadButton = screen.getByRole('button', { name: /Mark All Read/ });
  userEvent.click(markAllReadButton);
  await waitFor(() => expect(onAllRead).toBeCalledTimes(1));
});

test('notification preferences can be disabled trough property', () => {
  render(<NotificationInbox notificationPreferencesEnabled={false} />, { locale: 'en' });
  expect(
    screen.queryByRole('button', { name: /Notification preferences/ }),
  ).not.toBeInTheDocument();
});

test('notification preferences can be disabled trough useConfig hook', () => {
  useConfig.setState(
    ConfigFactory.build({ inbox: { features: { notificationPreferences: { enabled: false } } } }),
  );

  render(<NotificationInbox />, { locale: 'en' });
  expect(
    screen.queryByRole('button', { name: /Notification preferences/ }),
  ).not.toBeInTheDocument();
});

test('shows the user preferences panel when the preferences button is clicked', async () => {
  render(<NotificationInbox />, { locale: 'en' });
  const preferencesButton = screen.getByRole('button', { name: /Notification preferences/ });
  userEvent.click(preferencesButton);

  const checkboxes = await waitFor(() => screen.getAllByRole('checkbox'));
  expect(checkboxes).toHaveLength(9);

  // clicking again closes the preferences
  const removal = waitForElementToBeRemoved(() => screen.getAllByRole('checkbox'));
  userEvent.click(screen.getByRole('button', { name: /Notification preferences/ }));
  await removal;
});

test('the notifications panel contains a close button', async () => {
  render(<NotificationInbox />, { locale: 'en' });
  const preferencesButton = screen.getByRole('button', { name: /Notification preferences/ });
  userEvent.click(preferencesButton);

  const checkboxes = await waitFor(() => screen.getAllByRole('checkbox'));
  expect(checkboxes).toHaveLength(9);

  // close the preferences, return to inbox
  const closeButton = screen.getByRole('button', { name: /close/i });
  const removal = waitForElementToBeRemoved(() => screen.getAllByRole('checkbox'));
  userEvent.click(closeButton);
  await removal;
});

test('can render with a custom notification preferences component', async () => {
  const NotificationPreferences = () => <div data-testid="notification-preferences" />;

  render(<NotificationInbox NotificationPreferences={NotificationPreferences} />, { locale: 'en' });
  const button = screen.getByRole('button', { name: /Notification preferences/ });
  userEvent.click(button);

  await waitFor(() => screen.getByTestId('notification-preferences'));
});
