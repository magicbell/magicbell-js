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

  base.build.sourcemap = false;
  base.build.lib = outputs[process.env.ENTRY] || outputs.index;
  base.build.rollupOptions.external = ['vscode', 'path', 'fs'];
  return base;
});
