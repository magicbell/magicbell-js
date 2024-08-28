import { Option } from 'commander';

import pkg from '../package.json';
import { api } from './api';
import { config } from './config';
import { createCommand, findCommand, findTopCommand } from './lib/commands';
import { configStore } from './lib/config';
import { parseHost } from './lib/options';
import { printError, printMessage } from './lib/printer';
import { login } from './login';
import { logout } from './logout';
import * as projectResources from './project-resources';
import { user } from './user';

const publicCommands = ['login', 'logout', 'config'];

const program = createCommand()
  .name('magicbell')
  .description('Work with MagicBell from the command line')
  .version(pkg.version, '--version', 'Show magicbell version')
  .option('-p, --profile <string>', 'Profile to use', process.env.MAGICBELL_PROFILE || 'default')
  .option(
    '-t, --token <string>',
    'The jwt token to use. Set a default with `magicbell config set token` or via the MAGICBELL_TOKEN env var',
  )
  .option('-h, --host <string>', 'MagicBell API host', parseHost)
  .option('--no-color', 'Color output', true)
  .addOption(
    new Option('-r, --print-request <string>', 'Print the request command, without sending').choices(['curl']),
  );

// configure configstore
program.hook('preAction', function (thisCommand) {
  const options = thisCommand.opts();
  configStore.color = options.color;
});

// check auth on authenticated routes, and redirect to login if not authenticated
program.hook('preAction', function (thisCommand, actionCommand) {
  const { profile, token } = thisCommand.opts();

  if (!token) {
    thisCommand.setOptionValueWithSource('token', process.env.MAGICBELL_TOKEN, 'env');
  }

  const command = findTopCommand(actionCommand);
  if (publicCommands.includes(command.name()) || actionCommand.name() === 'help') return;

  // we don't need a profile or project credentials when a token is provided via arg or env
  if (thisCommand.getOptionValue('token')) return;

  const project = configStore.getProject(profile);

  if (!project?.apiKey || (command.name() !== 'user' && !project?.apiSecret)) {
    const error =
      profile === 'default'
        ? 'You are not logged in. Please run `magicbell login` to connect to your MagicBell account.'
        : `You've provided the profile "${profile}" via the --profile flag or the MAGICBELL_PROFILE environment variable, but you haven't logged in on that profile. Please run \`magicbell login -p ${profile}\`.`;

    printError(error, true);
  }
});

const commands = Object.values(projectResources);
for (const command of [...commands, user]) {
  program.addCommand(command.group('Resource commands'));
}

const otherCommands = [api, config, login, logout];
for (const command of otherCommands) {
  program.addCommand(command.group('Other commands'));
}

program.parse();

process.on('uncaughtException', function (err) {
  if (/param.*is missing/i.test(err.message)) {
    printMessage(`error: invalid arguments provided\n`);

    const command = findCommand(program, program.args);
    command.help({ error: true });
    process.exit(1);
  }

  printError(err.message, true);
});
