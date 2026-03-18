import { resolve } from 'path';
import { defineConfig } from 'vite';
import ReactPlugin from 'vite-preset-react';

import pkgjson from './package.json';

const alias = Object.entries(pkgjson.alias).reduce((acc, [key, value]) => {
  if (String(value).includes('node_modules')) {
    return acc;
  }

  acc[key] = resolve(__dirname, value, 'src');
  return acc;
}, {});

const aliasEntries = Object.entries(alias).flatMap(([key, value]) => [
  { find: new RegExp(`^${key}$`), replacement: value },
  { find: new RegExp(`^${key}\/(.+)$`), replacement: `${value}/$1` },
]);

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    jsx: 'automatic',
    jsxImportSource: '@emotion/react',
  },
  plugins: [
    ReactPlugin({
      injectReact: true,
      reactPluginOptions: {
        jsxRuntime: 'automatic',
        jsxImportSource: '@emotion/react',
      },
    }),
  ],
  resolve: {
    alias: aliasEntries,
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    exclude: Object.keys(alias),
  },
  publicDir: '../packages/embeddable/dist',
});
