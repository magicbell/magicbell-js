import { useNotificationFactory } from '@magicbell/react-headless';
import { screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { NotificationContent } from '../../../../src';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotification } from '../../../factories/NotificationFactory';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders the content as returned from the API, without sanitizing', () => {
  const { result } = renderHook(() =>
    useNotificationFactory({
      ...sampleNotification,
      content: `
            <p>Hello, <a href="javascript:alert('Hacked')">click here.</a></p>
            <img src="null" onerror="alert('Hacked')">
            `,
    }),
  );

  render(<NotificationContent notification={result.current} />);

  screen.getByText(/hello,/i);
  screen.getByRole('link', {
    name: /click here/i,
  });
  screen.getByRole('img');
});

test('replaces the content of time elements with a relative datetime', async () => {
  jest.setSystemTime(1615373877120);

  const { result } = renderHook(() =>
    useNotificationFactory({
      ...sampleNotification,
      content:
        '<p>The event starts <time datetime="2021-03-11T05:33:12Z" data-testid="time">on March 11</time>.</p>',
    }),
  );

  render(<NotificationContent notification={result.current} />);

  // Ideally, we would be checking by display value, but for some reason the textContent is not
  // updated in this test. However, we can still verify that timeAgo does its thing, by checking for
  // the timeago-id attribute.
  const time = screen.getByTestId('time');
  expect(time).toHaveAttribute('timeago-id');
});

test('does not replace time elements in upper scopes', async () => {
  jest.setSystemTime(1615460277120);

  const { result } = renderHook(() =>
    useNotificationFactory({
      ...sampleNotification,
      content:
        '<p>The event starts <time datetime="" data-testid="in-scope">on March 10</time>.</p>',
    }),
  );

  render(
    <div>
      <time dateTime="" data-testid="out-of-scope">
        on March 10
      </time>
      <NotificationContent notification={result.current} />
    </div>,
  );

  const inScope = screen.getByTestId('in-scope');
  const outOfScope = screen.getByTestId('out-of-scope');

  expect(inScope).toHaveAttribute('timeago-id');
  expect(outOfScope).not.toHaveAttribute('timeago-id');
});

test('time elements without dateTime attribute are ignored by timeAgo', async () => {
  jest.setSystemTime(1615460277120);

  const { result } = renderHook(() =>
    useNotificationFactory({
      ...sampleNotification,
      content: '<p>The event starts <time data-testid="in-scope">on March 10</time>.</p>',
    }),
  );

  render(<NotificationContent notification={result.current} />);

  const time = screen.getByTestId('in-scope');
  expect(time).not.toHaveAttribute('timeago-id');
});
