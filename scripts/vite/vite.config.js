import { dirname, resolve } from 'path';
import analyze from 'rollup-plugin-analyzer';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import { runTSC, writeIndexFile } from './plugins.js';
import {
  createFilename,
  cwd,
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

const outDir = resolve(cwd, 'dist');

export default defineConfig(async ({ mode, command }) => {
  const isDev = mode === 'development';
  const isBuild = command === 'build';

  return {
    root: cwd,
    publicDir: false,
    plugins: isBuild
      ? [
          isAnalyze && analyze({}),
          pkg.main === 'dist/index.js' && writeIndexFile({ fileName: pkg.name, outDir }),
          !shouldMinify && pkg.typings && runTSC(),
        ].filter(Boolean)
      : [],
    define: {
      __DEV__: isDev || (isBuild && !shouldMinify),
      __PACKAGE_NAME__: JSON.stringify(pkg.name),
      __PACKAGE_VERSION__: JSON.stringify(pkg.version),
      __CODE_VERSION__: JSON.stringify(revision),
    },
    esbuild: {
      jsx: 'automatic',
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
    },
  };
});
