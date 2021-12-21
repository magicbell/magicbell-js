import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Footer from '../src/components/Footer';
import { MagicBellThemeProvider } from '../src/context/MagicBellThemeContext';
import { defaultTheme } from '../src/context/Theme';

export default {
  title: 'MagicBell/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Footer {...props} />
  </MagicBellThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
