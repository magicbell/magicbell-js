import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MagicBellProvider } from '../src';
import NotificationInbox from './NotificationInbox';

export default {
  title: 'Example/NotificationInbox',
  component: MagicBellProvider,
} as ComponentMeta<typeof MagicBellProvider>;

const Template: ComponentStory<typeof MagicBellProvider> = (args) => (
  <MagicBellProvider {...args}>
    <NotificationInbox />
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: '15a8887d5eb97313e9f5d78e8ba5242d491606c8',
  userEmail: 'josue@magicbell.io',
};
