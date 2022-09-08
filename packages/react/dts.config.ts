import type { DtsConfig } from 'dts-cli';

const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const config: DtsConfig = {
  rollup(config, options) {
    config.plugins = config.plugins || [];

    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write CSS for the first bundle to avoid pointless extra files
        extract: options.writeMeta ? 'styles.css' : false,
      })
    );

    return config;
  },
};

module.exports = config;
