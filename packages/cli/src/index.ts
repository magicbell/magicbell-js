import { config } from './config';
import { createCommand, findCommand, findTopCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printError, printMessage } from './lib/printer';
import { listen } from './listen';
import { login } from './login';
import { logout } from './logout';
import * as resources from './resources';

const publicCommands = ['login', 'logout', 'config', 'help'];

function runCommand(name: string, ...args: any) {
  // events is there, Commander extends EventEmitter
  (program as any)._events[`command:${name}`](args);
}

const program = createCommand()
  .name('magicbell')
  .description('Work with MagicBell from the command line')
  .version(__PACKAGE_VERSION__, '-v, --version', 'Show magicbell version')
  .option('-p, --profile <string>', 'Profile to use', process.env.MAGICBELL_PROFILE || 'default');

program.hook('preAction', (thisCommand, actionCommand) => {
  const command = findTopCommand(actionCommand);
  if (publicCommands.includes(command.name()) || actionCommand.name() === 'help') return;

  if (configStore.get('apiKey') && configStore.get('apiSecret')) return;

  printError("You haven't set the API keys yet. Running `magicbell login`");
  runCommand('login');
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
