import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import ClickableNotification from '../../../../src/components/ClickableNotification';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotification } from '../../../factories/NotificationFactory';

const server = setupMockServer(mockHandlers.getConfig);

test('renders the title and content of the notification', () => {
  render(
    <ClickableNotification
      notification={{
        ...sampleNotification,
        title: 'sample notification title',
        content: 'sample notification content',
      }}
      onClick={vi.fn()}
    />,
  );

  screen.getByText(/sample notification title/i);
  screen.getByText(/sample notification content/i);
});

test('renders the title when no content is provided', () => {
  render(
    <ClickableNotification
      notification={{ ...sampleNotification, title: 'sample notification title' }}
      onClick={vi.fn()}
    />,
  );

  screen.getByText(/sample notification title/i);
});

test('renders the notification with seen/unseen background variation', () => {
  render(
    <>
      <ClickableNotification
        notification={{
          ...sampleNotification,
          id: '1',
          title: 'new notification',
          readAt: null,
          seenAt: null,
        }}
        onClick={vi.fn()}
      />
      <ClickableNotification
        notification={{
          ...sampleNotification,
          id: '2',
          title: 'old notification',
          readAt: Date.now(),
          seenAt: Date.now(),
        }}
        onClick={vi.fn()}
      />
    </>,
  );

  const unreadItem = screen.getByRole('button', { name: /new notification/i });
  const unreadStyle = window.getComputedStyle(unreadItem);

  const readItem = screen.getByRole('button', { name: /old notification/i });
  const readStyle = window.getComputedStyle(readItem);

  expect(unreadStyle.backgroundColor).not.toEqual(readStyle.backgroundColor);
});

test('renders the notification with the read/unread svg color variation', async () => {
  render(
    <>
      <ClickableNotification
        notification={{ ...sampleNotification, id: '1', title: 'new notification', seenAt: null }}
        onClick={vi.fn()}
      />
      <ClickableNotification
        notification={{
          ...sampleNotification,
          id: '2',
          title: 'old notification',
          readAt: Date.now(),
        }}
        onClick={vi.fn()}
      />
    </>,
  );

  const unreadItem = screen.getByRole('button', { name: /new notification/i });
  const unreadSvg = unreadItem.querySelector('svg')!.parentElement as HTMLElement;

  const readItem = screen.getByRole('button', { name: /old notification/i });
  const readSvg = readItem.querySelector('svg')!.parentElement as HTMLElement;

  expect(getComputedStyle(unreadSvg).color).not.toEqual(getComputedStyle(readSvg).color);
});

test('passes the notification object to the onClick callback', async () => {
  const onClick = vi.fn();
  const notification = { ...sampleNotification, title: 'notification' };

  render(<ClickableNotification notification={notification} onClick={onClick} />);

  const notificationButton = screen.getByRole('button', { name: /notification/i });

  await userEvent.click(notificationButton);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith(
    expect.objectContaining({
      id: notification.id,
      actionUrl: notification.actionUrl,
      title: notification.title,
    }),
  );
});

test('opens the action url in the same tab', async () => {
  global.open = vi.fn();

  server.intercept('post', '/notifications/:id/read', { status: 204 });

  render(
    <ClickableNotification
      notification={{
        ...sampleNotification,
        title: 'notification',
        actionUrl: 'https://example.com',
      }}
    />,
  );

  const notification = screen.getByRole('button', { name: /notification/i });

  await userEvent.click(notification);

  await waitFor(() => {
    expect(global.open).toHaveBeenCalledWith(expect.stringContaining('https://'), '_self');
  });
});

test('does not invoke the click handler when clicking on a link in the notification', async () => {
  const onClick = vi.fn();
  const notification = {
    ...sampleNotification,
    title: 'notification',
    content: 'Some text <a href="#">browse the docs</a> and more text',
  };

  render(<ClickableNotification notification={notification} onClick={onClick} />);
  const link = screen.getByRole('link', { name: /browse the docs/i });
  await userEvent.click(link);

  expect(onClick).not.toHaveBeenCalled();
});

// the click handler is called async, and depends on a global. The "success-test" currently infers with this one
test('does not invoke the action url when clicking on a link in the notification', async () => {
  global.open = vi.fn();

  const onClick = vi.fn();
  const notification = {
    ...sampleNotification,
    title: 'notification',
    content: 'Some text <a href="#">browse other docs</a> and more text',
    actionUrl: 'https://example.com/action-url',
  };

  render(<ClickableNotification notification={notification} onClick={onClick} />);
  const link = screen.getByRole('link', { name: /browse other docs/i });
  await userEvent.click(link);

  expect(global.open).toHaveBeenCalledTimes(0);
});
