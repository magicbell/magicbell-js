import { pushEventAggregator } from '@magicbell/react-headless';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
// import { renderWithProviders as render } from '../../../__utils__/render';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { Response, Server } from 'miragejs';
import React from 'react';

import MagicBell from '../../../../src';
import Text from '../../../../src/components/Text';
import NotificationFactory from '../../../../tests/factories/NotificationFactory';
import { sampleConfig } from '../../../factories/ConfigFactory';

const apiKey = faker.random.alphaNumeric(10);
const userEmail = faker.internet.email();
const userKey = faker.random.alphaNumeric(10);

let server;

beforeEach(() => {
  server = new Server({
    environment: 'test',
    urlPrefix: 'https://api.magicbell.com',
    trackRequests: true,
    timing: 50,
  });
  server.get('/notifications', {
    total: 5,
    current_page: 1,
    per_page: 15,
    total_pages: 1,
    project_id: 7,
    unseen_count: 0,
    unread_count: 4,
    notifications: NotificationFactory.buildList(5),
  });
  server.get('/config', sampleConfig);
  server.get('/notification_preferences', {
    notification_preferences: {
      categories: {
        comments: { email: false },
      },
    },
  });
  server.post('/notifications/seen', new Response(204, {}, ''));
});

afterEach(() => {
  server.shutdown();
});

test("renders the notification bell, but not it's children", async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  screen.getByRole('button', { name: 'Notifications' });
  expect(screen.queryByTestId('children')).not.toBeInTheDocument();
});

test('clicking the bell opens the inbox', async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const button = screen.getByRole('button');
  userEvent.click(button);
  await waitFor(() => screen.getByTestId('children'));
});

test('can render a custom bell icon', async () => {
  const BellIcon = () => <div data-testid="custom-icon">Custom bell icon</div>;

  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} BellIcon={<BellIcon />}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  screen.getByTestId('custom-icon');
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

  await waitFor(() => screen.getByText('Please mark all as read'));
});

test('shows the number of unread notifications', async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} bellCounter="unread">
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  await waitFor(() =>
    screen.getByRole('status', {
      name: '4 unread items',
    }),
  );
});

test('can close the inbox when defaultIsOpen is provided', async () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey} defaultIsOpen>
      {({ toggle }) => <div data-testid="children" onClick={toggle} />}
    </MagicBell>,
  );

  const button = screen.getByRole('button', { name: 'Notifications' });
  const removal = waitForElementToBeRemoved(() => screen.getByTestId('children'));
  userEvent.click(button);
  await removal;
});

test('calls the onToggle callback when the button is clicked', async () => {
  const onToggle = jest.fn();

  render(
    <MagicBell
      apiKey={apiKey}
      userEmail={userEmail}
      userKey={userKey}
      onToggle={onToggle}
      defaultIsOpen
    >
      {({ toggle }) => <div data-testid="children" onClick={toggle} />}
    </MagicBell>,
  );

  const button = screen.getByRole('button', { name: 'Notifications' });
  userEvent.click(button);

  expect(onToggle).toHaveBeenCalledTimes(1);
});

test('sets the headers for fetching from the API', () => {
  render(
    <MagicBell apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const requests = server.pretender.handledRequests;
  expect(requests[0].requestHeaders).toMatchObject({
    'X-MAGICBELL-API-KEY': apiKey,
    'X-MAGICBELL-USER-EMAIL': userEmail,
    'X-MAGICBELL-USER-HMAC': userKey,
  });
});

test('sets the external id header for fetching from the API', async () => {
  const userExternalId = faker.random.alphaNumeric(15);

  render(
    <MagicBell apiKey={apiKey} userExternalId={userExternalId} userKey={userKey}>
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  await waitFor(() => expect(server.pretender.handledRequests.length).toBe(2));
  const requests = server.pretender.handledRequests;
  expect(requests[1].requestHeaders).toMatchObject({
    'X-MAGICBELL-API-KEY': apiKey,
    'X-MAGICBELL-USER-EXTERNAL-ID': userExternalId,
    'X-MAGICBELL-USER-HMAC': userKey,
  });
});

test('calls the onNewNotification callback when a new notification is received', () => {
  const onNewNotification = jest.fn();

  render(
    <MagicBell
      apiKey={apiKey}
      userEmail={userEmail}
      userKey={userKey}
      onNewNotification={onNewNotification}
    >
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const notification = NotificationFactory.build();
  pushEventAggregator.emit('notifications.new', notification);

  expect(onNewNotification).toHaveBeenCalledTimes(1);
  expect(onNewNotification).toHaveBeenCalledWith(notification);
});

test('supports a custom notification Badge', async () => {
  const Badge = ({ count }) => <div data-testid="custom-badge">{count}</div>;

  render(
    <MagicBell
      apiKey={apiKey}
      userEmail={userEmail}
      userKey={userKey}
      Badge={Badge}
      bellCounter="unread"
    >
      {() => <div data-testid="children" />}
    </MagicBell>,
  );

  const badge = screen.getByTestId('custom-badge');
  await waitFor(() => expect(badge).toHaveTextContent('4'));
});
