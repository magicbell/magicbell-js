import { resolve } from 'path';
import { defineConfig } from 'vite';

import baseConfig from '../../scripts/vite/vite.config.js';

const outputs = {
  extension: {
    entry: resolve(__dirname, 'src/extension.ts'),
    formats: ['cjs'],
    fileName: 'extension',
  },
  index: {
    entry: resolve(__dirname, 'src/index.tsx'),
    formats: ['cjs'],
    fileName: 'index',
  },
};

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);

  // TODO: I think this app doesn't build because the /node_modules/magicbell folder
  //   doesn't have a package.json. Add aliases here that point to the /dist folder?
  //   by the time we're building, we should have a /dist folder. Turbo will make sure
  //   that packages are build in order.
  // TODO: it seems to work. Find a way to make this more generic in the main vite config.
  base.resolve.alias = {
    magicbell: resolve(__dirname, '../../packages/magicbell/dist'),
  };

  base.build.sourcemap = false;
  base.build.lib = outputs[process.env.ENTRY] || outputs.index;
  base.build.rollupOptions.external = ['vscode', 'path', 'fs'];
  return base;
});
