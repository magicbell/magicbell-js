import { MetaComponent, StoryComponent } from '@storybook/react';
import React from 'react';
import MagicBellProvider from '../src/components/MagicBellProvider';
import NotificationInbox from '../src/components/NotificationInbox';

export default {
  title: 'MagicBell/NotificationInbox',
  component: NotificationInbox,
  argTypes: {
    onNotificationClick: { action: 'onNotificationClick' },
    onAllRead: { action: 'onAllRead' },
  },
} as MetaComponent<typeof NotificationInbox>;

const Template: StoryComponent<typeof NotificationInbox> = (props) => (
  <MagicBellProvider apiKey="">
    <NotificationInbox {...props} />
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  height: 300,
};
