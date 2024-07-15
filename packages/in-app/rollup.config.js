import resolve from '@rollup/plugin-node-resolve';

export default {
  input: ['lit', 'lit/decorators.js'],
  output: {
    dir: 'public/vendor',
    format: 'es',
    preserveModules: true,
    minifyInternalExports: false,
    entryFileNames: (chunkInfo) => {
      const name = chunkInfo.name.replace('node_modules', '').replace('/index', '');
      return `${name}.mjs`;
    },
  },
  plugins: [resolve({ exportConditions: ['development'] })],
};
