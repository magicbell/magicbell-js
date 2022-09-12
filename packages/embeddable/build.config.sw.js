/* global require */
/* global process */
// import commonjs from '@rollup/plugin-commonjs';
// import nodeResolve from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import alias from 'rollup-plugin-alias';
// import copy from 'rollup-plugin-copy';
const license = require('rollu?p-plugin-license');
// import serve from 'rollup-plugin-serve';
// import { terser } from 'rollup-plugin-terser';
// import typescript from 'rollup-plugin-typescript2';
// import pkg from './package.json';
// import { execSync } from 'child_process';

//       license({
//         banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, MagicBell Inc.`,
//       }),

module.exports = {
  lib: {
    entry: 'src/web_push_notifications/service-worker.ts',
    formats: ['cjs'],
    fileName: 'sw.js',
    dir: 'dist/web-push-notifications',
  },
  rollupOptions: {
    external: false,
  },
  resolve: {
    alias: {
      'axios': 'redaxios',
    }
  }
};


// TODO: alias

//   {
//     output: [
//       {
//         file: 'dist/web-push-notifications/sw.js',
//         format: 'cjs',
//         sourcemap: true,
//       },
//     ],
//   },
// ];
