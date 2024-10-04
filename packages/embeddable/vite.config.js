import { defineConfig } from 'vite';

import { createFilename, shouldMinify } from '../../scripts/vite/settings.js';
import baseConfig from '../../scripts/vite/vite.config.js';

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);

  base.build.lib = {
    ...base.build.lib,
    formats: ['esm', 'umd'],
    name: 'MagicBell',
    fileName: (format) =>
      createFilename({
        name: 'magicbell',
        format: format === 'umd' ? '' : format,
        minify: shouldMinify,
      }),
  };

  base.build.rollupOptions.external = false;
  base.resolve = {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  };

  return base;
});
