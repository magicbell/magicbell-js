import { createCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printJson, printMessage } from './lib/printer';
import { mask } from './lib/text';

export const config = createCommand('config')
  .description('Manage configuration for magicbell')
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
    const project = configStore.getProject();
    if (!project) return;

    printJson({
      ...project,
      apiSecret: mask(project.apiSecret),
    });
  });

config
  .command('get')
  .description('Print the value of a given configuration key.')
  .argument('<key>', 'The configuration key to print.')
  .action((key) => {
    const ns = `projects.${configStore.profile}`;
    printMessage(configStore.get(`${ns}.${key}`));
  });

config
  .command('set')
  .description('Update configuration with a value for the given key.')
  .argument('<key>', 'The configuration key to update.')
  .argument('<value>', 'The value to set.')
  .action((key, value) => {
    const ns = `projects.${configStore.profile}`;
    configStore.set(`${ns}.${key}`, value);
  });

config
  .command('unset')
  .description('Remove the given key from the configuration.')
  .argument('<key>', 'The configuration key to remove.')
  .action((key) => {
    const ns = `projects.${configStore.profile}`;
    configStore.delete(`${ns}.${key}`);
  });
