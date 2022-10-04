import { dirname, resolve } from 'path';
import analyze from 'rollup-plugin-analyzer';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import GithubActionsReporter from 'vitest-github-actions-reporter';

import { writeIndexFile, writeTypeDefs } from './plugins/index.js';
import {
  createFilename,
  cwd,
  getPackageAliases,
  globalModules,
  isAnalyze,
  isExternal,
  isWatchMode,
  pkg,
  revision,
  shouldMinify,
} from './settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copyRightNotice = `
/** 
 * @license ${pkg.name} v${pkg.version.replace(/^v/, '')}
 *
 * Copyright (c) MagicBell Inc. and its affiliates.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
`.trimStart();

export default defineConfig(async ({ mode, command }) => {
  const isDev = mode === 'development';
  const isTest = mode === 'test';
  const isBuild = command === 'build';

  return {
    root: cwd,
    publicDir: false,
    plugins: isBuild
      ? [
          banner(copyRightNotice),
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
      reporters: isTest && process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    },
  };
});
