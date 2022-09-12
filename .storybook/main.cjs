const { join } = require('path');
const { mergeConfig } = require('vite');
const tsConfig = require('../tsconfig.json');

const dropNamespace = name => name.startsWith('@') ? name.slice(name.indexOf('/')+1) : name;

const alias = Object.entries(tsConfig.compilerOptions.paths)
  .reduce((acc, [key, values]) => Object.assign(acc, {[key]: join('..', values[0]) }), {});

const stories = Object.entries(alias).filter(([name]) => name[0] === '@').flatMap(([name, path]) => [
  {
    directory: path,
    files: '**/*.stories.@(js|jsx|ts|tsx|mdx)',
    titlePrefix: dropNamespace(name),
  },
  {
    directory: path.replace(/\/src$/, '/examples'),
    files: '**/*.stories.@(js|jsx|ts|tsx|mdx)',
    titlePrefix: dropNamespace(name) + '/examples',
  }
]);

/**
 * @type { import("@storybook/core-common").StorybookConfig }
 **/
module.exports = {
  stories,
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        styleLoaderOptions: {},
        cssLoaderOptions: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    check: true,
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    previewCsfV3: true,
  },
  async viteFinal(config) {
    const buildConfig = (await import('../scripts/vite/vite.config.js')).default({
      mode: 'development'
    });
    return mergeConfig(config, {
      esbuild: { jsx: 'automatic' },
      define: buildConfig.define,
      resolve: mergeConfig(buildConfig.resolve, { alias }, false),
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  }
};
