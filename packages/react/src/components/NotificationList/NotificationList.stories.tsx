import { Meta } from '@storybook/react';
import React from 'react';

import NotificationFactory from '../../../tests/factories/NotificationFactory';
import NotificationList from '../../components/NotificationList/NotificationList';
import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme } from '../../context/Theme';
import { merge } from '../../lib/merge';

const Component = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <NotificationList {...props} />
  </MagicBellThemeProvider>
);

const CustomListItem = ({ notification, onClick }) => (
  <div style={{ padding: '16px' }} onClick={() => onClick?.(notification)}>
    {notification.title}
  </div>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onItemClick: {
      action: 'onItemClick',
      description: 'Callback function, receives the clicked notification as the only argument',
    },
    height: {
      description: 'Height of the list. If not specified, then the window scroller is used.',
    },
    notifications: { description: 'Notifications store' },
  },
};

export default meta;

export const Default = {
  args: {
    height: 400,
    notifications: {
      total: 40,
      totalPages: 3,
      currentPage: 1,
      perPage: 15,
      notifications: NotificationFactory.buildList(10),
    },
  },
};

export const WithCustomListItem = merge(Default, {
  args: {
    height: 300,
    notifications: {
      total: 40,
      totalPages: 3,
      currentPage: 1,
      perPage: 15,
      notifications: NotificationFactory.buildList(10),
    },
    ListItem: CustomListItem,
  },
});
