import { Command } from 'commander';

import { config as cfg } from './lib/config';
import { printError, printJson } from './lib/printer';

export const config = new Command('config')
  .description('Display or change config values for magicbell')
  .action(() => config.help());

config
  .command('list')
  .description('Print a list of configuration keys and values')
  .action(() => printJson(cfg.get('config.json')));

config
  .command('get')
  .description('Print the value of a given configuration key.')
  .option('--api-key', 'The MagicBell api key to use for requests.')
  .option('--api-secret', 'The MagicBell api secret to use for project scoped requests.')
  .option('--user-email', 'The email of the user to use for user scoped requests.')
  .option('--user-external-id', 'The external id of the user to use for user scoped requests.')
  .action((opts, cmd) => {
    if (!Object.keys(opts).length) {
      cmd.help();
      process.exit(1);
    }

    printJson(Object.fromEntries(Object.entries(cfg.get('config.json')).filter(([key]) => opts[key])));
  });

config
  .command('set')
  .description('Update configuration with a value for the given key.')
  .option('--api-key <string>', 'The MagicBell api key to use for requests.')
  .option('--api-secret <string>', 'The MagicBell api secret to use for project scoped requests.')
  .option('--user-email <string>', 'The email of the user to use for user scoped requests.')
  .option('--user-external-id <string>', 'The external id of the user to use for user scoped requests.')
  .action((opts, cmd) => {
    if (!Object.keys(opts).length) {
      cmd.help();
      process.exit(1);
    }

    cfg.set('config.json', {
      ...cfg.get('config.json'),
      ...opts,
    });
  });

export function assertConfigured() {
  const { apiKey, apiSecret, userEmail, userExternalId } = cfg.get('config.json') || {};

  if (!apiKey || !(apiSecret || userEmail || userExternalId)) {
    printError("Please run 'magicbell config' first to setup your project.");
    process.exit(1);
  }
}
