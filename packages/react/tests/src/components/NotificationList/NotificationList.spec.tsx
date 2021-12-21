import { buildStore } from '@magicbell/react-headless';
import { NotificationStore } from '@magicbell/react-headless/dist/hooks/useNotifications';
import { screen } from '@testing-library/react';
import React from 'react';

import NotificationList, { ListItemProps } from '../../../../src/components/NotificationList';
import { MagicBellThemeProvider } from '../../../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../../../src/context/Theme';
import { renderWithProviders as render } from '../../../__utils__/render';
import { sampleNotification } from '../../../factories/NotificationFactory';

test('renders an empty list when there are no notifications', () => {
  const store = buildStore({ notifications: [] }) as NotificationStore;
  const { container } = render(<NotificationList notifications={store} />);

  const list = container.querySelector('.infinite-scroll-component');
  expect(list!.childNodes).toHaveLength(0);
});

test('renders a virtual list with all notifications', () => {
  const store = buildStore({ notifications: [sampleNotification] }) as NotificationStore;
  const { container } = render(<NotificationList notifications={store} />);

  const list = container.querySelector('.infinite-scroll-component');
  expect(list!.childNodes).toHaveLength(1);
});

test('renders a list matching the provided height', () => {
  const store = buildStore({ notifications: [sampleNotification] }) as NotificationStore;
  const { container } = render(<NotificationList notifications={store} height={300} />);

  const list = container.querySelector('.infinite-scroll-component') as HTMLDivElement;
  expect(list.style.height).toEqual('300px');
});

test('can render a list using a custom component for each item', () => {
  const store = buildStore({ notifications: [sampleNotification] }) as NotificationStore;

  function CustomListItem({ notification }: ListItemProps) {
    return <p data-testid="custom-listitem">{notification.title}</p>;
  }

  render(
    <MagicBellThemeProvider value={defaultTheme}>
      <NotificationList notifications={store} height={300} ListItem={CustomListItem} />
    </MagicBellThemeProvider>,
  );

  screen.getByTestId('custom-listitem');
});
