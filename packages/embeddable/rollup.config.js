import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy';
import license from 'rollup-plugin-license';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const isProduction = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.tsx',
    context: 'this',
    plugins: [
      nodeResolve({ browser: true }),
      typescript({
        rollupCommonJSResolveHack: true,
        useTsconfigDeclarationDir: true,
        clean: true,
      }),
      commonjs({
        // use a regex to make sure to include eventual hoisted packages
        include: /\/node_modules\//,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      !isProduction && serve({ contentBase: ['public', 'dist'] }),
      isProduction && strip(),
      isProduction &&
        terser({
          ecma: 2015,
        }),
      isProduction &&
        license({
          banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, SupportBee`,
        }),
      copy({
        targets: [{ src: 'public/index.html', dest: 'dist' }],
      }),
    ],
    output: [
      {
        name: 'MagicBell',
        file: 'dist/magicbell.min.js',
        format: 'iife',
      },
    ],
  },
];
