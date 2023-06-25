import { Command } from 'commander';

import { configStore } from './lib/config';
import { printJson, printMessage } from './lib/printer';
import { mask } from './lib/text';

export const config = new Command('config')
  .description('Display or change config values for magicbell')
  .action(() => config.help());

config
  .command('path')
  .description('Print the path to the config file being used')
  .action(() => {
    printMessage(configStore.path);
  });

config
  .command('list')
  .description('Print a list of configuration keys and values')
  .action(() => {
    printJson({
      ...configStore.all,
      apiSecret: mask(configStore.all.apiSecret),
    });
  });

config
  .command('get')
  .description('Print the value of a given configuration key.')
  .argument('<key>', 'The configuration key to print.')
  .action((key) => {
    printMessage(configStore.get(key));
  });

config
  .command('set')
  .description('Update configuration with a value for the given key.')
  .argument('<key>', 'The configuration key to update.')
  .argument('<value>', 'The value to set.')
  .action((key, value) => {
    configStore.set(key, value);
  });

config
  .command('unset')
  .description('Remove the given key from the configuration.')
  .argument('<key>', 'The configuration key to remove.')
  .action((key) => {
    configStore.delete(key);
  });
