import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Header from '../src/components/Header';
import { MagicBellThemeProvider } from '../src/context/MagicBellThemeContext';
import { defaultTheme } from '../src/context/Theme';

export default {
  title: 'MagicBell/Header',
  component: Header,
  argTypes: {
    onAllRead: { action: 'onAllRead' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (props) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Header {...props} />
  </MagicBellThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
