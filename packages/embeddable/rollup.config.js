import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
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
        include: ['node_modules/**'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      !isProduction && serve({ contentBase: ['public', 'dist'] }),
      isProduction && strip(),
      isProduction && terser(),
      isProduction &&
        license({
          banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, SupportBee`,
        }),
    ],
    output: [
      {
        name: 'MagicBell',
        file: 'dist/magicbell-js.min.js',
        format: 'iife',
      },
    ],
  },
];
