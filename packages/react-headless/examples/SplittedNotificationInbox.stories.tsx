import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../src';
import SplittedNotificationInbox from './SplittedNotificationInbox';

const Component = (props) => (
  <MagicBellProvider {...props}>
    <SplittedNotificationInbox />
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  args: {
    apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
    userEmail: 'josue@magicbell.com',
    stores: [
      { id: 'default', defaultQueryParams: {} },
      { id: 'read', defaultQueryParams: { read: true } },
      { id: 'unread', defaultQueryParams: { read: false } },
      { id: 'archived', defaultQueryParams: { archived: true } },
    ],
  },
};

export default meta;

export const Default = {};
