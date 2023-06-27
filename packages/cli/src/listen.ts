import { getClient } from './lib/client';
import { createCommand } from './lib/commands';
import { parseOptions } from './lib/options';
import { printJson } from './lib/printer';

export const listen = createCommand('listen')
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
