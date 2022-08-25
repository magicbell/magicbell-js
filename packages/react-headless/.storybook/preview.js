import 'twind/shim';

const pkg = require('../package.json');

global.__DEV__ = true;
global['__PACKAGE_NAME__'] = pkg.name;
global['__PACKAGE_VERSION__'] = pkg.version;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}