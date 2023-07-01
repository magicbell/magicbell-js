import pkg from '../package.json';
import { config } from './config';
import { createCommand, findCommand, findTopCommand } from './lib/commands';
import { configStore } from './lib/config';
import { parseHost } from './lib/options';
import { printError, printMessage } from './lib/printer';
import { listen } from './listen';
import { login } from './login';
import { logout } from './logout';
import * as resources from './resources';

const publicCommands = ['login', 'logout', 'config'];

const program = createCommand()
  .name('magicbell')
  .description('Work with MagicBell from the command line')
  .version(pkg.version, '--version', 'Show magicbell version')
  .option('-p, --profile <string>', 'Profile to use', process.env.MAGICBELL_PROFILE || 'default')
  .option('-h, --host <string>', 'MagicBell API host', parseHost)
  .option('--no-color', 'Color output', true);

// configure configstore
program.hook('preAction', function (thisCommand) {
  const options = thisCommand.opts();
  configStore.profile = options.profile;
  configStore.color = options.color;
  configStore.host = options.host;
});

// check auth on authenticated routes, and redirect to login if not authenticated
program.hook('preAction', function (thisCommand, actionCommand) {
  const command = findTopCommand(actionCommand);
  if (publicCommands.includes(command.name()) || actionCommand.name() === 'help') return;

  const project = configStore.getProject();

  if (!project?.apiKey || !project?.apiSecret) {
    const profile = configStore.profile;
    const error =
      profile === 'default'
        ? 'You are not logged in. Please run `magicbell login` to connect to your MagicBell account.'
        : `You've provided the profile "${profile}" via the --profile flag or the MAGICBELL_PROFILE environment variable, but you haven't logged in on that profile. Please run \`magicbell login -p ${profile}\`.`;

    printError(error, true);
  }
});

const commands = Object.values(resources).concat([listen]);
const otherCommands = [config, login, logout];

for (const command of commands) {
  program.addCommand(command.group('Resource commands'));
}

for (const command of otherCommands) {
  program.addCommand(command.group('Other commands'));
}

program.parse();

process.on('uncaughtException', function (err) {
  if (/param.*is missing/i.test(err.message)) {
    printMessage(`error: invalid arguments provided\n`);
  } else {
    printMessage(`error: ${err.message}`);
  }

  const command = findCommand(program, program.args);
  command.help({ error: true });
});
