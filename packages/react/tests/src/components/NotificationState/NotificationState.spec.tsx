import { useNotificationFactory } from '@magicbell/react-headless';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NotificationState from '../../../../src/components/NotificationState';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { sampleNotification } from '../../../factories/NotificationFactory';

test('renders an icon for the context menu when the notification is read', () => {
  const { result } = renderHook(() =>
    useNotificationFactory({ ...sampleNotification, readAt: Date.now() }),
  );

  const { container } = render(<NotificationState notification={result.current} />);

  const svg = container.querySelector('svg') as SVGElement;
  expect(svg.childNodes).toHaveLength(3);
});

test('renders a dot when the notification is unread', () => {
  const { result } = renderHook(() =>
    useNotificationFactory({ ...sampleNotification, readAt: null }),
  );

  const { container } = render(<NotificationState notification={result.current} />);

  const svg = container.querySelector('svg') as SVGElement;
  expect(svg.childNodes).toHaveLength(1);
});

test('renders the context menu on click', async () => {
  const { result } = renderHook(() =>
    useNotificationFactory({ ...sampleNotification, readAt: null }),
  );

  const { container } = render(<NotificationState notification={result.current} />);

  const bell = container.querySelector('svg') as SVGElement;
  userEvent.click(bell);

  await waitFor(() => screen.getByText(/mark as read/i));
});

test('renders a menu in the specified position', async () => {
  const { result } = renderHook(() => useNotificationFactory(sampleNotification));

  const { container } = render(
    <MagicBellThemeProvider value={defaultTheme}>
      <NotificationState notification={result.current} menuPlacement="top-end" />
    </MagicBellThemeProvider>,
  );

  const icon = container.querySelector('svg') as SVGElement;
  userEvent.click(icon);

  await waitFor(() => screen.getByText(/delete/i));
  const tippy = container.querySelector('[data-tippy-root]') as HTMLDivElement;

  expect(tippy!.style.transform).toEqual('translate(0px, -2px)');
});

test('renders the menu icon when hovering an unread notification', async () => {
  const { result } = renderHook(() =>
    useNotificationFactory({ ...sampleNotification, readAt: null }),
  );

  const { container } = render(
    <MagicBellThemeProvider value={defaultTheme}>
      <NotificationState notification={result.current} menuPlacement="top-end" />
    </MagicBellThemeProvider>,
  );

  const icon = container.querySelector('svg') as SVGElement;
  expect(container.querySelector('svg > circle:nth-child(2)')).not.toBeInTheDocument();

  userEvent.hover(icon);

  await waitFor(() =>
    expect(container.querySelector('svg > circle:nth-child(2)')).toBeInTheDocument(),
  );
});
