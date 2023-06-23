import { Client } from 'magicbell';

import { config } from './lib/config';

export function getClient() {
  const cfg = config.get('config.json');

  // TODO: enable all beta features
  return new Client({ ...cfg, appInfo: { name: __PACKAGE_NAME__, version: __PACKAGE_VERSION__ } });
}

process.on('uncaughtException', function (err) {
  // eslint-disable-next-line no-console
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
