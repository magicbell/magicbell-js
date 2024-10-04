import { useNotificationFactory } from '@magicbell/react-headless';
import { mockHandlers, setupMockServer } from '@magicbell/utils';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ClickableNotification } from '../../../../src';
import NotificationMenu from '../../../../src/components/NotificationMenu';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

setupMockServer(...mockHandlers);

test('renders an button for the context menu', () => {
  render(<ClickableNotification notification={sampleNotification} />);
  screen.getByRole('button', { name: /menu/i });
});

test('renders the context menu on click', async () => {
  render(<ClickableNotification notification={{ ...sampleNotification, seenAt: null, readAt: null }} />);
  const menu = screen.getByRole('button', { name: /menu/i });
  await userEvent.click(menu);

  await waitFor(() => screen.getByText(/mark as read/i));
});

// Skip, this test won't work with happy-dom or recent jsdom versions
test.skip('renders a menu in the specified position', async () => {
  const { result } = renderHook(() => useNotificationFactory(sampleNotification));

  const { container } = render(
    <MagicBellThemeProvider value={defaultTheme}>
      <NotificationMenu notification={result.current} />
    </MagicBellThemeProvider>,
  );

  const menu = screen.getByRole('button', { name: /menu/i });
  await userEvent.click(menu);

  await waitFor(() => screen.getByText(/delete/i));
  const tippy = container.querySelector('[data-tippy-root]') as HTMLDivElement;

  expect(tippy!.style.transform).toEqual('translate(0px, -2px)');
});
