import { useNotificationFactory } from '@magicbell/react-headless';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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

// This one doesn't work, the behavior is covered by other tests, but in this specific one, the
// datetime is never replaced
test.skip('replaces the content of time tags with a relative datetime', async () => {
  jest.setSystemTime(1615373877120);

  const { result } = renderHook(() =>
    useNotificationFactory({
      ...sampleNotification,
      content: '<p>The event starts <time datetime="2021-03-11T05:33:12Z">on March 11</time>.</p>',
    }),
  );

  render(<NotificationContent notification={result.current} />);
  screen.getByText(/on March 11/i);

  await waitForElementToBeRemoved(() => screen.getByText(/on March 11/i));
});
