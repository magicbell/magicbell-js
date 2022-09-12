import { Meta } from '@storybook/react';
import React from 'react';

import { MagicBellThemeProvider } from '../../context/MagicBellThemeContext';
import { defaultTheme } from '../../context/Theme';
import Footer from './Footer';

const Component = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Footer {...props} />
  </MagicBellThemeProvider>
);

const meta: Meta = {
  component: Component,
};

export default meta;

export const Default = {};
