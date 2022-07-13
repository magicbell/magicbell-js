import { Meta } from '@storybook/react';
import React from 'react';

import Timestamp from '../../src/components/Timestamp';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../src/context/Theme';

const Component = (args) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Timestamp {...args} />
  </MagicBellThemeProvider>
);

const meta: Meta = {
  component: Component,
  argTypes: {
    date: { control: 'date', description: 'Date to be rendered.' },
  },
};

export default meta;

export const Default = {
  args: {
    date: Date(),
  },
};
