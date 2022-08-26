/* eslint-disable @typescript-eslint/no-var-requires */
import replace from '@rollup/plugin-replace';
import type { DtsConfig } from 'dts-cli';

const pkg = require('./package.json');

const config: DtsConfig = {
  rollup(config) {
    config.plugins = config.plugins || [];

    config.plugins.unshift(
      replace({
        __PACKAGE_NAME__: JSON.stringify(pkg.name),
        __PACKAGE_VERSION__: JSON.stringify(pkg.version),
        preventAssignment: true,
      }),
    );

    return config;
  },
};

module.exports = config;
