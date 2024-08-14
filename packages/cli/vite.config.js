import { builtinModules } from 'node:module';

import { defineConfig } from 'vite';

import baseConfig from '../../scripts/vite/vite.config.js';

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);
  base.build.lib.formats = ['cjs'];
  base.build.lib.fileName = () => 'index.cjs';
  base.build.sourcemap = false;

  base.build.rollupOptions.external = builtinModules;
  return base;
});
