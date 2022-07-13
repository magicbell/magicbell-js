import { Meta } from '@storybook/react';
import React from 'react';

import Header from '../../src/components/Header';
import CheckMarkIcon from '../../src/components/icons/CheckMarkIcon';
import SettingsIcon from '../../src/components/icons/SettingsIcon';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../src/context/Theme';

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
