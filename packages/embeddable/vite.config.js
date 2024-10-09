import { resolve } from 'path';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { replaceCodePlugin } from 'vite-plugin-replace';

import { createFilename, getCopyRightNotice, revision, shouldMinify } from '../../scripts/vite/settings.js';
import packageJson from './package.json';

export default defineConfig(() => ({
  root: process.cwd(),
  publicDir: false,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    banner(getCopyRightNotice(packageJson.name, packageJson.version)),
    replaceCodePlugin({
      replacements: [
        { from: '__PACKAGE_NAME__', to: packageJson.name },
        { from: '__PACKAGE_VERSION__', to: packageJson.version },
        { from: '__GIT_HASH__', to: revision },
      ],
    }),
  ],
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
    minify: shouldMinify,
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: resolve(process.cwd(), 'src/index.tsx'),
      formats: ['esm', 'umd'],
      name: 'MagicBell',
      fileName: (format) =>
        createFilename({
          name: 'magicbell',
          format: format === 'umd' ? '' : format,
          minify: shouldMinify,
        }),
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
}));
