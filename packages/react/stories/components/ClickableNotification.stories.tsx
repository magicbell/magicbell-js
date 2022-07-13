import { Meta } from '@storybook/react';
import React from 'react';

import ClickableNotification from '../../src/components/ClickableNotification/ClickableNotification';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { merge } from '../../src/lib/merge';

const Component = ({ notification, onClick, theme }) => (
  <MagicBellThemeProvider value={theme}>
    <ClickableNotification notification={notification} onClick={onClick} />
  </MagicBellThemeProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onClick: {
      action: 'onClick',
      description: 'Callback function, receives the clicked notification as the only argument',
    },
    notification: { description: 'Notification to render' },
  },
};

export default meta;

export const Default = {
  args: {
    notification: {
      id: 1,
      title: 'Lorem ipsum',
      content: '@John the changes in the API were approved',
      actionUrl: 'https://magicbell.io',
      sentAt: 1599900000,
      seenAt: 1599900000,
      readAt: null,
    },
  },
};

export const WithRelativeTimes = merge(Default, {
  args: {
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
  },
});
