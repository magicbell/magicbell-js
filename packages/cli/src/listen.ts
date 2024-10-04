import EventSource from 'eventsource';

import { getUserClient as getClient } from './lib/client.js';
import { createCommand } from './lib/commands.js';
import { parseOptions } from './lib/options.js';
import { printJson } from './lib/printer.js';

if (!globalThis.EventSource) {
  globalThis.EventSource = EventSource;
}

export const listen = createCommand('listen')
  .description('Listen to events for a users inbox')
  .option('--user-email <string>', 'Email of the user to listen as')
  .option('--user-external-id <string>', 'External ID of the user to listen as')
  .option('--expand', 'Fetch additional notification details for incoming events.')
  .action(({ expand, ...opts }, cmd) => {
    const { options } = parseOptions(opts);

    const client = getClient(cmd);
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
