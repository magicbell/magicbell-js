import { useConfig } from '@magicbell/react-headless';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Response, Server } from 'miragejs';
import React from 'react';
import MagicBellProvider from '../../../../src/components/MagicBellProvider';
import NotificationInbox from '../../../../src/components/NotificationInbox';
import { sampleConfig } from '../../../factories/ConfigFactory';
import { sampleNotification } from '../../../factories/NotificationFactory';
import { renderWithProviders as render } from '../../../__utils__/render';

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
    total: 1,
    current_page: 1,
    per_page: 15,
    total_pages: 1,
    project_id: 7,
    unseen_count: 1,
    unread_count: 1,
    notifications: [sampleNotification],
  });
  server.post('/notifications/read', () => new Response(204, {}, ''));
  server.post('/notifications/*/read', () => new Response(204, {}, ''));
});

afterEach(() => {
  server.shutdown();
});

test('renders a header, the list of notifications and a footer if the notifications are fetched', async () => {
  render(<NotificationInbox height={300} />);

  const requests = server.pretender.handledRequests;
  expect(requests[0].queryParams).toMatchObject({ page: '1' });

  // header
  screen.getByRole('heading', { name: /notifications/i });

  // notification
  await waitFor(() => screen.getByText(/This is a good content/i));

  // footer
  screen.getByRole('button', { name: /notification preferences/i });
});

test('renders nothing if the notification store does not exist', () => {
  const { container } = render(
    <MagicBellProvider apiKey="">
      <NotificationInbox height={300} storeId="non-existing" />
    </MagicBellProvider>,
  );

  expect(container).toBeEmptyDOMElement();
});

test('clicking the mark-all-read button invokes the onAllRead callback', () => {
  const onAllRead = jest.fn();

  render(<NotificationInbox onAllRead={onAllRead} height={300} />);

  const button = screen.getByRole('button', { name: /mark all read/i });
  userEvent.click(button);

  expect(onAllRead).toHaveBeenCalledTimes(1);
});

test('renders a message and a image if there are no notifications', async () => {
  server.get('/notifications', {
    total: 0,
    current_page: 1,
    per_page: 15,
    total_pages: 1,
    project_id: 7,
    unseen_count: 0,
    unread_count: 0,
    notifications: [],
  });

  render(<NotificationInbox />);

  await waitFor(() => screen.getByText(/We'll let you know when there's more./))
  screen.getByRole('img', { name: /no notifications/i });
});
