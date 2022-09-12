import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme } from '../../context/Theme';
import CheckMarkIcon from '../icons/CheckMarkIcon';
import SettingsIcon from '../icons/SettingsIcon';
import Header from './Header';

const Component = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Header {...props} />
    <div />
    <div />
  </MagicBellThemeProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
  },
};

export default meta;

export const Default = {
  args: {
    title: 'MagicBell',
    actions: (
      <>
        <button>
          <CheckMarkIcon />
        </button>

        <button>
          <SettingsIcon />
        </button>
      </>
    ),
  },
};
