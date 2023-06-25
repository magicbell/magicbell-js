import { Command } from 'commander';

import { config } from './config';
import { findTopCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printError } from './lib/printer';
import { listen } from './listen';
import { login } from './login';
import { logout } from './logout';
import * as resources from './resources';

const program = new Command();

const pubicCommands = ['login', 'logout', 'config'];

function runCommand(name: string, ...args: any) {
  // events is there, Commander extends EventEmitter
  (program as any)._events[`command:${name}`](args);
}

program.name(__PACKAGE_NAME__).description('CLI access to the MagicBell REST api').version(__PACKAGE_VERSION__);

program.hook('preAction', (thisCommand, actionCommand) => {
  const command = findTopCommand(actionCommand);
  if (pubicCommands.includes(command.name())) return;

  if (configStore.get('apiKey') && configStore.get('apiSecret')) return;

  printError("You haven't set the API keys yet. Running `magicbell login`");
  runCommand('login');
});

program.addCommand(config);
program.addCommand(listen);
program.addCommand(login);
program.addCommand(logout);

program.showHelpAfterError();

program.configureHelp({
  sortSubcommands: true,
});

for (const resource of Object.values(resources)) {
  program.addCommand(resource);
}

program.parse();
