/* global require */
/* global process */
// import commonjs from '@rollup/plugin-commonjs';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import alias from 'rollup-plugin-alias';
// import copy from 'rollup-plugin-copy';
// const license = require('rollu?p-plugin-license');
// import serve from 'rollup-plugin-serve';
// import { terser } from 'rollup-plugin-terser';
// import typescript from 'rollup-plugin-typescript2';
// import pkg from './package.json';
// import { execSync } from 'child_process';

//       license({
//         banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, MagicBell Inc.`,
//       }),

import { defineConfig, mergeConfig } from 'vite';

import baseConfig from '../../scripts/vite/vite.config.js';
import { createFilename, shouldMinify } from '../../scripts/vite/settings.js';

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);

  if ( process.env.ENTRY === 'sw') {
    base.build.outDir = 'dist/web-push-notifications';
    base.build.lib = {
      ...base.build.lib,
      formats: ['cjs'],
      fileName: (format) => `sw.min.js`,
    }
  } else {
    base.build.lib = {
      ...base.build.lib,
      formats: ['esm', 'umd'],
      name: 'MagicBell',
      fileName: (format) =>
        createFilename({
          name: 'magicbell',
          format: format === 'umd' ? '' : format,
          minify: shouldMinify
        })
    }
  }

  base.build.rollupOptions.external = false;
  base.resolve = {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'axios': 'redaxios',
    }
  };

  return base;
});


// TODO: alias

//   {
//     input: 'src/web_push_notifications/service-worker.ts',
//     plugins: [
//       alias({
//         entries: [{ find: 'axios', replacement: require.resolve('redaxios') }],
//       }),
//       nodeResolve({ browser: true }),
//       typescript({
//         rollupCommonJSResolveHack: true,
//         useTsconfigDeclarationDir: true,
//         clean: true,
//       }),
//       commonjs({
//         // use a regex to make sure to include eventual hoisted packages
//         include: /\/node_modules\//,
//       }),
//       terser({
//         ecma: 2015,
//       }),
//       license({
//         banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, MagicBell Inc.`,
//       }),
//     ],
//     output: [
//       {
//         file: 'dist/web-push-notifications/sw.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//     ],
//   },
// ];
