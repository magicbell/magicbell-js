import { getClient } from './lib/client';
import { createCommand } from './lib/commands';
import { parseOptions } from './lib/options';
import { printError, printJson } from './lib/printer';

export const listen = createCommand('listen')
  .description('Listen to events for a users inbox')
  .option('--user-email <string>', 'Email of the user to listen as')
  .option('--user-external-id <string>', 'External ID of the user to listen as')
  .option('--expand', 'Fetch additional notification details for incoming events.')
  .action(({ expand, ...opts }, cmd) => {
    const { options } = parseOptions(opts);

    if (!options.userEmail && !options.userExternalId) {
      printError('You must specify either --user-email or --user-external-id', true);
    }

    if (options.userEmail && options.userExternalId) {
      printError('You can only specify one of --user-email or --user-external-id', true);
    }

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
