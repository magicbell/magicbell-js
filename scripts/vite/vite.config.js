import { defineConfig } from 'vite';
import { resolve } from 'path';
import {
  createFilename,
  globalModules,
  isExternal,
  pkg,
  revision,
} from './settings.js';

import { runTSC, writeIndexFile } from './plugins.js';
import analyze from 'rollup-plugin-analyzer';

const cwd = process.cwd();

const args = process.argv.slice(2);

const flags = {
  watch: args.includes('--watch') || args.includes('-w'),
  minify: args.includes('--minify'),
  analyze: Boolean(process.env.ANALYZE),
};

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';
  const isProduction = mode === 'production';
  const isDev = mode === 'development';

  return {
    root: cwd,
    publicDir: false,
    plugins: [
      isProduction && flags.analyze && analyze({}),
      isProduction && writeIndexFile({ outDir: resolve(cwd, 'dist') }),
      isProduction && runTSC(),
    ].filter(Boolean),
    define: {
      __DEV__: isDev || (isProduction && !flags.minify),
      __PACKAGE_NAME__: JSON.stringify(pkg.name),
      __PACKAGE_VERSION__: JSON.stringify(pkg.version),
      __CODE_VERSION: JSON.stringify(revision),
    },
    build: {
      target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
      minify: flags.minify,
      sourcemap: true,
      emptyOutDir: false,
      watch: flags.watch,
      lib: {
        entry: resolve(cwd, pkg.source || 'src/index.ts'),
        fileName: (format) => createFilename(format, flags.minify),
        formats: ['cjs', 'esm'],
      },
      rollupOptions: {
        external: isExternal,
        output: {
          exports: 'named',
          globals: globalModules,
          // preserveModules: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: resolve(__dirname, 'test.setup.js'),
      restoreMocks: true,
      mockReset: true,
      clearMocks: true,
    },
  };
});
