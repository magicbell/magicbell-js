import React from 'react';
import {addons} from '@storybook/addons'
import { themes } from '../stories/themes';
import server from './server.js';

server.start();

// Some stories may set up keyboard event handlers, which interfers with storybook
addons.setConfig({
  enableShortcuts: false
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};


const withTheme = (Story, context)  => {
  const themeName = context.parameters.theme || context.globals.theme;
  const themeNames = Array.isArray(themeName) ? themeName : [themeName];
  const selectedThemes = themeName === 'all' ? Object.values(themes) : themeNames.map(n => themes[n]);

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${selectedThemes.length}, 1fr)`,
  };

  return (
    <div style={containerStyle}>
      {selectedThemes.map(theme =>
        <div key={theme.name} style={{
          width: '100%',
          height: '100%',
          background: theme.background,
          minWidth: 600,
        }}>
          <Story args={{ theme: theme.theme, ...context.args }} />
        </div>
      )}
    </div>
  )
}

const withAuth = (Story, context) => {
  const auth = {
    apiKey: 'df24a28e8921181f6c4220fc306ba76701592d21',
    userEmail: 'josue@magicbell.io',
    userKey: 'pvorWv0ff2MvYFNyadwOLmFzTZnT1LCFxzTELAULYT4=',
  };

  return  <Story args={{ ...auth, ...context.args }} />
}

export const decorators = [withTheme, withAuth];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      icon: 'photo',
      items: [...Object.keys(themes).map(theme => ({
        value: theme,
        title: themes[theme].name,
      })), { value: 'all', title: 'all' }],
      showName: true,
    },
  },
}