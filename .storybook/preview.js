import { addons } from '@storybook/addons';

Object.assign(global, {
  __DEV__: process.env.NODE_ENV === 'development',
});

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

// Some stories may set up keyboard event handlers, which interfers with storybook
addons.setConfig({
  enableShortcuts: false,
});
