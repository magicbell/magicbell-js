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

const Template: StoryComponent<typeof NotificationInbox> = ({
  apiKey,
  userEmail,
  userKey,
  ...props
}) => (
  <MagicBellProvider apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
    <NotificationInbox {...props} />
  </MagicBellProvider>
);

export const Default = Template.bind({});
Default.args = {
  height: 400,
  apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
  userEmail: 'josue@magicbell.io',
  userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
};

export const WithCustomPreferences = Template.bind({});
WithCustomPreferences.args = {
  ...Default.args,
  NotificationPreferences: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <p>Your Settings Page</p>
    </div>
  ),
};

export const WithPreferencesDisabled = Template.bind({});
WithPreferencesDisabled.args = {
  ...Default.args,
  notificationPreferencesEnabled: false,
};
