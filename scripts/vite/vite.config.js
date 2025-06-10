import { resolve } from 'path';
import analyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { configDefaults } from 'vitest/config';
import GithubActionsReporter from 'vitest-github-actions-reporter';

import { writeIndexFile, writeTypeDefs } from './plugins/index.js';
import {
  createFilename,
  cwd,
  getCopyRightNotice,
  getPackageAliases,
  globalModules,
  isAnalyze,
  isExternal,
  isWatchMode,
  pkg,
  revision,
  shouldMinify,
} from './settings.js';

export default defineConfig(async ({ mode, command }) => {
  const isDev = mode === 'development';
  const isTest = mode === 'test';
  const isBuild = command === 'build';

  return {
    root: cwd,
    publicDir: false,
    plugins: isBuild
      ? [
          banner(getCopyRightNotice(pkg.name, pkg.version)),
          isAnalyze && analyze({}),
          pkg.main === 'dist/index.js' && writeIndexFile({ fileName: pkg.name }),
          !shouldMinify && isBuild && writeTypeDefs(),
        ].filter(Boolean)
      : [],
    define: {
      __DEV__: isDev || (isBuild && !shouldMinify),
      __PACKAGE_NAME__: JSON.stringify(pkg.name),
      __PACKAGE_VERSION__: JSON.stringify(pkg.version),
      __CODE_VERSION__: JSON.stringify(revision),
      ...(shouldMinify
        ? {
            'process.env.NODE_ENV': JSON.stringify('production'),
          }
        : {}),
    },
    esbuild: {
      jsx: 'automatic',
    },
    resolve: {
      alias: isTest ? getPackageAliases(true) : {},
    },
    build: {
      target: ['chrome60', 'firefox60', 'safari11', 'edge18'],
      minify: shouldMinify,
      sourcemap: true,
      emptyOutDir: false,
      watch: isWatchMode,
      lib: {
        entry: resolve(cwd, pkg.source || 'src/index.ts'),
        formats: ['cjs', 'esm'],
        fileName: (format) =>
          createFilename({
            name: pkg.name,
            format,
            minify: shouldMinify,
          }),
      },
      rollupOptions: {
        external: isExternal,
        output: {
          exports: 'named',
          globals: globalModules,
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
      isolate: true,
      threads: false,
      reporters: isTest && process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
      exclude: configDefaults.exclude,
    },
  };
});
