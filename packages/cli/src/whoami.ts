import { Command } from 'commander';

import { getClient } from './client';
import { printError, printJson } from './lib/printer';

export const whoami = new Command('whoami')
  .description('Display your magicbell project id and user details')
  .action(async () => {
    try {
      const res = await getClient().request({ method: 'GET', path: '/notifications' });
      printJson({
        project_id: res.project_id,
        ...res.user,
      });
    } catch (e) {
      printError('Not logged in. Please run `magicbell config set` to provide credentials.');
    }
  });
