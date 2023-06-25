import { Command } from 'commander';
import kleur from 'kleur';
import readline from 'readline-sync';

import { getClient } from './lib/client';
import { configStore } from './lib/config';
import { printError, printMessage } from './lib/printer';

export const login = new Command('login')
  .description('Login to your MagicBell project using the CLI')
  // TODO: we only support interactive at the moment, upgrade to support non-interactive
  // .option('-i, --interactive', 'Run interactive if you cannot open a browser')
  // TODO: we could upgrade the config store to support multiple projects, and add a global flag
  //   to support a --project per command
  // .option('-p, --project-name <string>', 'The project to use for requests')
  .action(async () => {
    try {
      printMessage('Please enter your MagicBell API credentials.');
      printMessage(kleur.dim('You can find these at https://app.magicbell.com > Settings > API Keys.'));
      printMessage();

      const apiKey = await readline.question('Enter your API key: ');
      const apiSecret = await readline.question('Enter your API secret: ', {
        hideEchoBack: true,
      });

      const client = getClient({
        apiKey,
        apiSecret,
      });

      const project = await client.getProject();

      if (!project) {
        throw Error('Could not find project');
      }

      configStore.set('apiKey', apiKey);
      configStore.set('apiSecret', apiSecret);
      configStore.set('projectId', project.id);
      configStore.set('projectName', project.name);

      printMessage(`\nYou are now logged in to project ${kleur.bold(project.name)}`);
    } catch (e) {
      printError(
        'Not logged in. Please try again using `magicbell login`, or run `magicbell login -i` to provide credentials manually.',
      );
    }
  });

login.configureHelp({
  sortSubcommands: true,
});
