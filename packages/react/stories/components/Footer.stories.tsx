import { Meta } from '@storybook/react';
import React from 'react';

import Footer from '../../src/components/Footer';
import { MagicBellThemeProvider } from '../../src/context/MagicBellThemeContext';
import { defaultTheme } from '../../src/context/Theme';

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
