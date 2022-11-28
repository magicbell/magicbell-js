import { Command } from 'commander';

import { getClient } from './client';
import { printJson } from './lib/printer';
import { parseOptions } from './options';

export const listen = new Command('listen')
  .description('Listen to events for a users inbox')
  .option('--expand', 'Fetch additional notification details for incoming events.')
  .action(({ expand, ...opts }) => {
    const { options } = parseOptions(opts);

    const client = getClient();
    client.listen(options).forEach(async (event) => {
      let notification;

      if (expand && 'id' in event.data && !event.name.endsWith('/delete')) {
        notification = await client.notifications.get(event.data.id, options).catch(() => null);
      }

      printJson({
        ...event,
        data: notification || event.data,
      });
    });
  });
