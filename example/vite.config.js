import { defineConfig } from 'vite';
import ReactPlugin from 'vite-preset-react';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    ReactPlugin({
      injectReact: false,
    }),
  ],
});
