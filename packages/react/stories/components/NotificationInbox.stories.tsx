import { Meta } from '@storybook/react';
import React from 'react';

import MagicBellProvider from '../../src/components/MagicBellProvider';
import NotificationInbox from '../../src/components/NotificationInbox';
import { merge } from '../../src/lib/merge';

const Component = ({ apiKey, userEmail, userKey, ...props }) => (
  <MagicBellProvider apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
    <NotificationInbox {...props} />
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onNotificationClick: { action: 'onNotificationClick' },
    onAllRead: { action: 'onAllRead' },
  },
};

export default meta;

export const Default = {
  args: {
    height: 400,
  },
};

export const WithCustomPreferences = merge(Default, {
  args: {
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
  },
});

export const WithPreferencesDisabled = merge(Default, {
  args: {
    notificationPreferencesEnabled: false,
  },
});
