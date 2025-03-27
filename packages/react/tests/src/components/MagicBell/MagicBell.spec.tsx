import { eventAggregator } from '@magicbell/react-headless';
import { fake, mockHandler, mockHandlers, setupMockServer } from '@magicbell/utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as faker from 'faker';
import * as React from 'react';
import { ComponentProps } from 'react';

import MagicBellProvider from '../../../../src';
import Text from '../../../../src/components/Text';
import NotificationFactory from '../../../../tests/factories/NotificationFactory';

const apiKey = faker.random.alphaNumeric(10);
const userEmail = faker.internet.email();
const userExternalId = faker.random.alphaNumeric(15);
const userKey = faker.random.alphaNumeric(10);

const server = setupMockServer(
  ...mockHandlers,
  mockHandler('get', '/notifications', {
    ...fake.notificationPage,
    notifications: [fake.notification],
  }),
);

function MagicBell(props: ComponentProps<typeof MagicBellProvider>) {
  // apply defaults to disable theme fetching
  return <MagicBellProvider theme={{}} locale="en" images={{}} apiClientCacheTTL={0} {...props} />;
}

test("renders the notification bell, but not it's default children", async () => {
  render(<MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} />);

  await screen.findByRole('button', { name: /notifications/i });
  expect(screen.queryByRole('button', { name: /mark all read/i })).not.toBeInTheDocument();
});

test('clicking the bell opens the default inbox', async () => {
  render(<MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} />);

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  await screen.findByRole('button', { name: /Mark All Read/i });
});

test("renders the notification bell, but not it's custom children", async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  await screen.findByRole('button', { name: /notifications/i });
  expect(screen.queryByTestId('children')).not.toBeInTheDocument();
});

test('clicking the bell opens the custom inbox', async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  await waitFor(() => screen.getByTestId('children'));
});

test('can render a custom bell icon', async () => {
  const BellIcon = () => <div data-testid="custom-icon">Custom bell icon</div>;

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} BellIcon={<BellIcon />}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  await screen.findByTestId('custom-icon');
});

test('renders the children when it is mounted with defaultIsOpen', () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} defaultIsOpen>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  screen.getByTestId('children');
});

test('supports custom translations', async () => {
  render(
    <MagicBell
      apiKey={apiKey}
      userEmail={userEmail}
      userKey={userKey}
      locale={{
        name: 'en-US',
        translations: {
          header: { 'mark-all-read': 'Please mark all as read' },
        },
      }}
      defaultIsOpen
    >
      {() => <Text id="header.mark-all-read" defaultMessage="default" />}
    </MagicBell>,
  );

  const header = await waitFor(() => screen.getByText('Please mark all as read'));
  expect(header).toBeInTheDocument();
});

test('shows the number of unread notifications', async () => {
  server.intercept('get', '/notifications', {
    ...fake.notificationPage,
    unread_count: 4,
    notifications: [fake.notification],
  });

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} bellCounter="unread">
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const counter = await waitFor(() =>
    screen.getByRole('status', {
      name: '4 unread items',
    }),
  );

  expect(counter).toBeInTheDocument();
});

test('can close the inbox when defaultIsOpen is provided', async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} defaultIsOpen>
      {({ toggle }) => <div data-testid="children" onClick={toggle} />}
    </MagicBell>,
  );

  const button = await screen.findByRole('button', { name: /notifications/i });
  await userEvent.click(button);
  await waitFor(() => expect(screen.queryByTestId('children')).not.toBeInTheDocument());
});

test('calls the onToggle callback when the button is clicked', async () => {
  const onToggle = vi.fn();

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} onToggle={onToggle} defaultIsOpen>
      {({ toggle }) => <div data-testid="children" onClick={toggle} />}
    </MagicBell>,
  );

  const button = await screen.findByRole('button', { name: /notifications/i });
  await userEvent.click(button);

  expect(onToggle).toHaveBeenCalledTimes(1);
});

test('supports controlled state', async () => {
  function App() {
    const [isOpen, setIsOpen] = React.useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((open) => !open);

    return (
      <>
        <button type="button" onClick={open}>
          open
        </button>
        <button type="button" onClick={close}>
          close
        </button>
        <button type="button" onClick={toggle}>
          toggle
        </button>

        <MagicBell apiKey="__API_KEY__" userEmail="__USER_EMAIL__" onToggle={toggle} isOpen={isOpen}>
          {() => <div data-testid="children" />}
        </MagicBell>
      </>
    );
  }

  render(<App />);

  expect(screen.queryByTestId('children')).not.toBeInTheDocument();

  const button = screen.getByRole('button', { name: 'open' });
  await userEvent.click(button);
  expect(screen.getByTestId('children')).toBeInTheDocument();

  const closeButton = screen.getByRole('button', { name: 'close' });
  await userEvent.click(closeButton);
  expect(screen.queryByTestId('children')).not.toBeInTheDocument();

  const toggleButton = screen.getByRole('button', { name: 'toggle' });
  await userEvent.click(toggleButton);
  expect(screen.getByTestId('children')).toBeInTheDocument();
  await userEvent.click(toggleButton);
  expect(screen.queryByTestId('children')).not.toBeInTheDocument();
});

test('sets the headers for fetching from the API', async () => {
  const status = server.intercept('all', '/notifications', fake.notificationPage);

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div />}
    </MagicBell>,
  );

  await waitFor(() => expect(status.handledRequests).toBeGreaterThan(0));
  expect(status.lastRequest.headers.get('x-magicbell-api-key')).toEqual(apiKey);
  expect(status.lastRequest.headers.get('x-magicbell-user-email')).toEqual(userEmail);
  expect(status.lastRequest.headers.get('x-magicbell-user-hmac')).toEqual(userKey);
});

test('sets the external id header for fetching from the API', async () => {
  const status = server.intercept('all', '/notifications', fake.notificationPage);

  render(
    <MagicBell apiKey={apiKey} userExternalId={userExternalId} userKey={userKey}>
      {() => <div />}
    </MagicBell>,
  );

  await waitFor(() => expect(status.handledRequests).toBeGreaterThan(0));
  expect(status.lastRequest.headers.get('x-magicbell-api-key')).toEqual(apiKey);
  expect(status.lastRequest.headers.get('x-magicbell-user-external-id')).toEqual(userExternalId);
  expect(status.lastRequest.headers.get('x-magicbell-user-hmac')).toEqual(userKey);
});

test('calls the onNewNotification callback when a new notification is received', () => {
  const onNewNotification = vi.fn();

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} onNewNotification={onNewNotification}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const notification = NotificationFactory.build();
  eventAggregator.emit('notifications.new', { data: notification, source: 'remote' });

  expect(onNewNotification).toHaveBeenCalledTimes(1);
  expect(onNewNotification).toHaveBeenCalledWith(notification);
});

test('supports a custom notification Badge', async () => {
  server.intercept('get', '/notifications', {
    ...fake.notificationPage,
    unread_count: 4,
    notifications: [fake.notification],
  });

  const Badge = ({ count }) => <div data-testid="custom-badge">{count}</div>;

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} Badge={Badge} bellCounter="unread">
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const badge = await screen.findByTestId('custom-badge');
  await waitFor(() => expect(badge).toHaveTextContent('4'));
});
