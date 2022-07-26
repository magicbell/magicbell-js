import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import React from 'react';

import MagicBellProvider from '../../src/components/MagicBellProvider';
import PreferencesCategories from '../../src/components/UserPreferencesPanel/PreferencesCategories';

const Component = ({ apiKey, userEmail, userKey, ...props }) => (
  <MagicBellProvider apiKey={apiKey} userEmail={userEmail} userKey={userKey}>
    <PreferencesCategories {...props} />
  </MagicBellProvider>
);

const meta: Meta = {
  component: Component,
  args: {
    onChange: action('onChange'),
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
    categories: ['comments'],
  },
};

export const SelectedChannelsAndCategoriesOnly = {
  args: {
    channels: ['email', 'sms'],
    categories: ['comments'],
  },
};
