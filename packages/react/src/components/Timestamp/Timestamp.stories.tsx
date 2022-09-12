import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme } from '../../context/Theme';
import Timestamp from './Timestamp';

const Component = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Timestamp {...props} />
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
