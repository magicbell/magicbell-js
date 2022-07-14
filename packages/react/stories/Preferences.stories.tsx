import { Meta } from '@storybook/react';
import React from 'react';

import MagicBellProvider from '../src/components/MagicBellProvider';
import PreferencesCategories from '../src/components/UserPreferencesPanel/PreferencesCategories';

const Component = ({ apiKey, userEmail, userKey, ...props }) => (
  <MagicBellProvider apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
    <PreferencesCategories {...props} />
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  title: 'MagicBell/Preferences',
  args: {
    apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
    userEmail: 'josue@magicbell.io',
    userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  },
};

export default meta;

export const Basic = {};

export const SelectedChannelsOnly = {
  args: {
    channels: ['email', 'sms'],
  },
};

export const SelectedCategoriesOnly = {
  args: {
    categories: ['announcements', 'billing'],
  },
};

export const SelectedChannelsAndCategoriesOnly = {
  args: {
    channels: ['email', 'sms'],
    categories: ['announcements', 'billing'],
  },
};
