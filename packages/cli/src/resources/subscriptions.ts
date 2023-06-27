// This file is generated. Do not update manually!

import { getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';

export const subscriptions = createCommand('subscriptions').description('Manage subscriptions');

subscriptions
  .command('list')
  .description("Fetch user's topic subscriptions")
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .action(async ({ paginate, ...opts }) => {
    const { options } = parseOptions(opts);

    const response = getClient().subscriptions.list(options);

    if (paginate) {
      await response.forEach((notification) => printJson(notification));
    } else {
      await response.then((result) => printJson(result));
    }
  });

subscriptions
  .command('create')
  .description('Create a topic subscription')
  .option(
    '--categories <string...>',
    'A list of hashes containing the category slug and the reason for the subscription',
  )
  .option(
    '--topic <string>',
    'The topic the user should be subscribed to. If the topic does not exist it will be created.',
  )
  .action(async (opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().subscriptions.create(data, options);
    printJson(response);
  });

subscriptions
  .command('unsubscribe')
  .description('Unsubscribe from a topic')
  .argument('<topic>', "The topic for which we'd like to filter topic subscriptions.")
  .option(
    '--categories <string...>',
    'A list of hashes containing the category slug and the reason for the subscription',
  )
  .action(async (topic, opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().subscriptions.unsubscribe(topic, data, options);
    printJson(response);
  });

subscriptions
  .command('get')
  .description('Show a topic subscription')
  .argument('<topic>', "The topic for which we'd like to filter topic subscriptions.")
  .action(async (topic, opts) => {
    const { options } = parseOptions(opts);

    const response = await getClient().subscriptions.get(topic, options);
    printJson(response);
  });

subscriptions
  .command('delete')
  .description('Delete topic subscription(s)')
  .argument('<topic>', "The topic for which we'd like to filter topic subscriptions.")
  .option(
    '--categories <string...>',
    'A list of hashes containing the category slug and the reason for the subscription. Omiting categories deletes all topic subscriptions beloning to the topic.',
  )
  .action(async (topic, opts) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient().subscriptions.delete(topic, data, options);
    printJson(response);
  });
