import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.tsx',
    plugins: [
      alias({
        entries: {
          react: 'preact/compat',
          'react-dom': 'preact/compat',
        },
      }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      strip(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      terser(),
      license({
        banner: `MagicBell JavaScript Library <%= pkg.version %>\nhttps://magicbell.io\nCopyright <%= new Date().getFullYear() %>, SupportBee`,
      }),
    ],
    output: [
      {
        name: 'MagicBell',
        file: 'dist/widget.js',
        format: 'umd',
      },
    ],
  },
];
