import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import NotificationList from '../src/components/NotificationList/NotificationList';
import { MagicBellThemeProvider } from '../src/context/MagicBellThemeContext';
import { defaultTheme } from '../src/context/Theme';
import NotificationFactory from '../tests/factories/NotificationFactory';

export default {
  title: 'MagicBell/NotificationList',
  component: NotificationList,
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
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (props) => {
  return (
    <MagicBellThemeProvider value={defaultTheme}>
      <NotificationList {...props} />
    </MagicBellThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  height: 400,
  notifications: {
    total: 40,
    totalPages: 3,
    currentPage: 1,
    perPage: 15,
    notifications: NotificationFactory.buildList(10),
  },
};

function CustomListItem({ notification, onClick }) {
  const handleClick = () => onClick?.(notification);

  return (
    <div style={{ padding: '16px' }} onClick={handleClick}>
      {notification.title}
    </div>
  );
}

export const WithCustomListItem = Template.bind({});
WithCustomListItem.args = {
  height: 300,
  notifications: {
    total: 40,
    totalPages: 3,
    currentPage: 1,
    perPage: 15,
    notifications: NotificationFactory.buildList(10),
  },
  ListItem: CustomListItem,
};
