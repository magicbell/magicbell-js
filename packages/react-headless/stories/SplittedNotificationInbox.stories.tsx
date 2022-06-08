import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../src';
import SplittedNotificationInbox from './SplittedNotificationInbox';

export default {
  title: 'Example/SplittedNotificationInbox',
  component: MagicBellProvider,
} as ComponentMeta<typeof MagicBellProvider>;

const Template: ComponentStory<typeof MagicBellProvider> = (args) => (
  <MagicBellProvider {...args}>
    <SplittedNotificationInbox />
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.com',
  stores: [
    { id: 'default', defaultQueryParams: {} },
    { id: 'read', defaultQueryParams: { read: true } },
    { id: 'unread', defaultQueryParams: { read: false } },
  ],
};
