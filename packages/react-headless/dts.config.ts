/* eslint-disable @typescript-eslint/no-var-requires */
import replace from '@rollup/plugin-replace';
import type { DtsConfig } from 'dts-cli';

const pkg = require('./package.json');

const umdExternals = new Set(['react', 'react-dom']);

const config: DtsConfig = {
  rollup(config) {
    const output = (Array.isArray(config.output) ? config.output[0] : config.output) || {};

    config.plugins = config.plugins || [];

    // add replace op before sourcemaps are generated
    const index = config.plugins.findIndex((x) => x && x.name === 'sourcemaps');
    config.plugins.splice(
      index,
      0,
      replace({
        __PACKAGE_NAME__: JSON.stringify(pkg.name),
        __PACKAGE_VERSION__: JSON.stringify(pkg.version),
        preventAssignment: true,
      }),
    );

    if (output.format === 'umd') {
      config.external = (id) => umdExternals.has(id.split('/')[0]);
    }

    return config;
  },
};

module.exports = config;
