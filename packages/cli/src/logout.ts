import { Command } from 'commander';

import { configStore } from './lib/config';
import { printMessage } from './lib/printer';

export const logout = new Command('logout').description('Logout of your MagicBell project').action(async () => {
  configStore.delete('apiKey');
  configStore.delete('apiSecret');
  configStore.delete('projectId');
  configStore.delete('projectName');

  printMessage(`You are now logged out.`);
});

logout.configureHelp({
  sortSubcommands: true,
});
