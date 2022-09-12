import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../src';
import NotificationInbox from './NotificationInbox';

const Component = (props) => (
  <MagicBellProvider {...props}>
    <NotificationInbox />
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  args: {
    apiKey: '15a8887d5eb97313e9f5d78e8ba5242d491606c8',
    userEmail: 'josue@magicbell.io',
  },
};

export default meta;

export const Default = {};
