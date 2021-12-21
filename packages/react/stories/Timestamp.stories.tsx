import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Timestamp from '../src/components/Timestamp';
import { MagicBellThemeProvider } from '../src/context/MagicBellThemeContext';
import { defaultTheme } from '../src/context/Theme';

export default {
  title: 'MagicBell/Lib/Timestamp',
  component: Timestamp,
  argTypes: {
    date: { control: 'date', description: 'Date to be rendered.' },
  },
} as ComponentMeta<typeof Timestamp>;

const Template: ComponentStory<typeof Timestamp> = (args) => (
  <MagicBellThemeProvider value={defaultTheme}>
    <Timestamp {...args} />
  </MagicBellThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  date: Date(),
};
