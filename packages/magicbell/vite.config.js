import path from 'path';
import { defineConfig } from 'vite';

import baseConfig from '../../scripts/vite/vite.config.js';

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);

  base.build.lib = {
    entry: process.env.ENTRY,
    formats: ['esm'],
    fileName: () => path.basename(process.env.ENTRY, '.ts') + '.mjs',
  };

  // don't minify, consumer packages can take care of that, this eases their debugging
  base.build.minify = false;
  base.esbuild.minify = false;
  base.esbuild.minifyIdentifiers = false;
  base.esbuild.minifySyntax = false;
  base.esbuild.minifyWhitespace = false;

  return base;
});
