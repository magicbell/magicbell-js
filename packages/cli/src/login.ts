import kleur from 'kleur';
import readline from 'readline-sync';

import { getProjectClient as getClient } from './lib/client.js';
import { createCommand } from './lib/commands.js';
import { configStore } from './lib/config.js';
import { printError, printMessage } from './lib/printer.js';

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

      await client.broadcasts.list({ per_page: 1 }).catch((e) => {
        const code = String(e?.code);

        if (e?.status === 401) {
          if (/api_key/i.test(code)) throw new Error(`Invalid API key`);
          if (/api_secret/i.test(code)) throw new Error(`Invalid API secret`);
          throw new Error(`Invalid API credentials`);
        }

        if (host) throw new Error(`Failed to login while using an alternative host (${host}): ${e.message}`);
        throw new Error(`Failed to login: ${e.message}`);
      });

      try {
        configStore.setProject(profile, {
          apiKey,
          apiSecret,
          host,
        });
      } catch (e) {
        throw new Error(`Failed to save project: ${e.message}. Is the config path (${configStore.path}) writable?`);
      }

      printMessage(`\nYou are now logged in.`);
    } catch (e) {
      printMessage('');
      printError(e.message);
    }
  });
