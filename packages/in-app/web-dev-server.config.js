import path from 'node:path';

import rollupAlias from '@rollup/plugin-alias';
import rollupBabel from '@rollup/plugin-babel';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import babelPresetSolid from 'babel-preset-solid';
import * as fs from 'fs/promises';
import mime from 'mime-types';
import rollupSvelte from 'rollup-plugin-svelte';

const babel = fromRollup(rollupBabel);
const replace = fromRollup(rollupReplace);
const alias = fromRollup(rollupAlias);
const svelte = fromRollup(rollupSvelte);

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

/** @type {import('@web/dev-server').DevServerConfig} */
export default {
  open: 'dev',
  nodeResolve: {
    exportConditions: mode === 'dev' ? ['development'] : [],
    preferBuiltins: true,
    browser: true,
    rootDir: '../../',
  },
  preserveSymlinks: true,
  mimeTypes: {
    '**/*.jsx': 'js',
    '**/*.svelte': 'js',
  },
  middleware: [
    async (ctx, next) => {
      await next();

      if (ctx.status !== 404) return;

      try {
        const filepath = path.join('dev', 'public', ctx.path);
        ctx.body = await fs.readFile(filepath, { encoding: 'utf-8' });
        ctx.set('content-type', mime.lookup(filepath));
        ctx.status = 200;
      } catch {
        // return 404 from above
      }
    },
  ],
  plugins: [
    babel({
      include: ['**/react/**/*.jsx'],
      babelHelpers: 'bundled',
      plugins: [['@babel/plugin-transform-react-jsx']],
    }),
    babel({
      include: ['**/solid/**/*.jsx'],
      babelHelpers: 'bundled',
      plugins: babelPresetSolid().plugins,
    }),
    svelte({
      include: ['**/svelte/**/*.svelte'],
      dev: true,
      css: (css) => {
        css.write('public/build/svelte.css');
      },
    }),
    replace({
      preventAssignment: false,
      'process.env.NODE_ENV': '"development"',
    }),

    alias({
      entries: [{ find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' }],
    }),
  ],
};
