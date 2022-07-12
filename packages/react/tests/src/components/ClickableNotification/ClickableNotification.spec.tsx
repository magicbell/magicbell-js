import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ClickableNotification from '../../../../src/components/ClickableNotification';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotification } from '../../../factories/NotificationFactory';

test('renders the title and content of the notification', () => {
  render(
    <ClickableNotification
      notification={{
        ...sampleNotification,
        title: 'sample notification title',
        content: 'sample notification content',
      }}
      onClick={jest.fn()}
    />,
  );

  screen.getByText(/sample notification title/i);
  screen.getByText(/sample notification content/i);
});

test('renders the title when no content is provided', () => {
  render(
    <ClickableNotification
      notification={{ ...sampleNotification, title: 'sample notification title' }}
      onClick={jest.fn()}
    />,
  );

  screen.getByText(/sample notification title/i);
});

test('renders the notification with seen/unseen background variation', () => {
  render(
    <>
      <ClickableNotification
        notification={{ ...sampleNotification, id: '1', title: 'new notification', seenAt: null }}
        onClick={jest.fn()}
      />
      <ClickableNotification
        notification={{
          ...sampleNotification,
          id: '2',
          title: 'old notification',
          seenAt: Date.now(),
        }}
        onClick={jest.fn()}
      />
    </>,
  );

  const unreadItem = screen.getByRole('button', { name: /new notification/i });
  const unreadStyle = window.getComputedStyle(unreadItem.parentElement!);

  const readItem = screen.getByRole('button', { name: /old notification/i });
  const readStyle = window.getComputedStyle(readItem.parentElement!);

  expect(unreadStyle.backgroundColor).not.toEqual(readStyle.backgroundColor);
});

test('renders the notification with the read/unread svg color variation', async () => {
  render(
    <>
      <ClickableNotification
        notification={{ ...sampleNotification, id: '1', title: 'new notification', seenAt: null }}
        onClick={jest.fn()}
      />
      <ClickableNotification
        notification={{
          ...sampleNotification,
          id: '2',
          title: 'old notification',
          readAt: Date.now(),
        }}
        onClick={jest.fn()}
      />
    </>,
  );

  const unreadItem = screen.getByRole('button', { name: /new notification/i });
  const unreadSvg = unreadItem.parentElement!.querySelector('svg')!.parentElement as HTMLElement;

  const readItem = screen.getByRole('button', { name: /old notification/i });
  const readSvg = readItem.parentElement!.querySelector('svg')!.parentElement as HTMLElement;

  expect(getComputedStyle(unreadSvg).color).not.toEqual(getComputedStyle(readSvg).color);
});

test('passes the notification object to the onClick callback', async () => {
  const onClick = jest.fn();
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
  global.open = jest.fn();

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

  expect(global.open).toHaveBeenCalledTimes(1);
  expect(global.open).toHaveBeenCalledWith('https://example.com', '_self');
});

test('does not invoke the click handler when clicking on a link in the notification', async () => {
  const onClick = jest.fn();
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

test('does not invoke the action url when clicking on a link in the notification', async () => {
  global.open = jest.fn();

  const onClick = jest.fn();
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
