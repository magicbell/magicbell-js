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

export default defineConfig(({ mode }) => ({
  root: cwd,
  publicDir: false,
  plugins: [
    flags.analyze && analyze({}),
    writeIndexFile({ outDir: resolve(cwd, 'dist') }),
    runTSC(),
  ].filter(Boolean),
  define: {
    __DEV__: !flags.minify || mode === 'development',
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
}));
