import kleur from 'kleur';
import readline from 'readline-sync';

import { getProjectClient as getClient } from './lib/client';
import { createCommand } from './lib/commands';
import { configStore } from './lib/config';
import { printError, printMessage } from './lib/printer';

export const login = createCommand('login')
  .description('Login to your MagicBell account')
  .action(async (opts, cmd) => {
    try {
      printMessage('Please enter your MagicBell API credentials.');
      printMessage(kleur.dim('You can find these at https://app.magicbell.com > Settings > API Keys.'));
      printMessage();

      const apiKey = await readline.question('Enter your API key: ');
      const apiSecret = await readline.question('Enter your API secret: ', {
        hideEchoBack: true,
      });

      const client = getClient(cmd, {
        apiKey,
        apiSecret,
      });

      const { profile, host } = cmd.optsWithGlobals();
      const project = await client.getProject();

      configStore.setProject(profile, {
        id: project.id,
        name: project.name,
        apiKey,
        apiSecret,
        host,
      });

      printMessage(`\nYou are now logged in to project ${kleur.bold(project.name)}`);
    } catch (e) {
      printError('Not logged in. Please try again using `magicbell login`');
    }
  });
