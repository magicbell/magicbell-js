import type { DtsConfig } from 'dts-cli';

const umdExternals = new Set(['react', 'react-dom']);

const config: DtsConfig = {
  rollup(config) {
    const output = (Array.isArray(config.output) ? config.output[0] : config.output) || {};

    if (output.format === 'umd') {
      config.external = (id) => umdExternals.has(id.split('/')[0]);
    }

    return config;
  },
};

module.exports = config;
