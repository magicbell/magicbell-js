import { Meta } from '@storybook/react';
import React from 'react';

import ClickableNotification from '../src/components/ClickableNotification/ClickableNotification';
import { MagicBellThemeProvider } from '../src/context/MagicBellThemeContext';

export default {
  title: 'MagicBell/ClickableNotification',
  component: ClickableNotification,
  argTypes: {
    onClick: {
      action: 'onClick',
      description: 'Callback function, receives the clicked notification as the only argument',
    },
    notification: { description: 'Notification to render' },
  },
} as Meta;

const Template = ({ notification, onClick, theme }) => (
  <MagicBellThemeProvider value={theme}>
    <ClickableNotification notification={notification} onClick={onClick} />
  </MagicBellThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  notification: {
    id: 1,
    title: 'Lorem ipsum',
    content: '@John the changes in the API were approved',
    actionUrl: 'https://magicbell.io',
    sentAt: 1599900000,
    seenAt: 1599900000,
    readAt: null,
  },
};

export const WithRelativeTimes = Template.bind({});
WithRelativeTimes.args = {
  notification: {
    id: 1,
    title: 'Lorem ipsum',
    content:
      '@John the changes in the API were approved <time datetime="2021-03-12T05:33:12Z">on March 12</time>',
    actionUrl: 'https://magicbell.io',
    sentAt: 1599900000,
    seenAt: 1599900000,
    readAt: null,
  },
};
