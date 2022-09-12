import { addons } from '@storybook/addons';
import { withAuth, withTheme } from './decorators';
import server from './server';

server.start();

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Some stories may set up keyboard event handlers, which interfers with storybook
addons.setConfig({
  enableShortcuts: false,
});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'photo',
      items: ['light', 'flat', 'classic', 'all'],
      title: 'Theme',
    },
  },
}

export const decorators = [withAuth, withTheme];
