// This file is generated. Do not update manually!

import { getProjectClient as getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';
import { usersNotifications } from './users/notifications';
import { usersPushSubscriptions } from './users/push-subscriptions';

export const users = createCommand('users').description('Manage users');
users.addCommand(usersNotifications);
users.addCommand(usersPushSubscriptions);

users
  .command('create')
  .description('Create a user')
  .option(
    '--external-id <string>',
    "A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
  )
  .option('--email <string>', "The user's email.")
  .option('--first-name <string>', "The user's first name.")
  .option('--last-name <string>', "The user's last name.")
  .option(
    '--custom-attributes <json>',
    "Any customer attributes that you'd like to associate with the user. You may want to use these attributes later when writing email templates, for example.",
  )
  .option('--phone-numbers <string...>', 'An array of phone numbers to use for sending SMS notifications.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).users.create(data, options);
    printJson(response);
  });

users
  .command('list')
  .description('Fetch users')
  .option('--page <integer>', 'The page number of the paginated response. Defaults to 1.')
  .option('--per-page <integer>', 'The number of items per page. Defaults to 20.')
  .option(
    '--last-seen-at:before <string>',
    'Fetch users seen before the specified `last_seen_at` timestamp. Please send it in RFC3339 format',
  )
  .option(
    '--last-seen-at:after <string>',
    'Fetch users seen after the specified `last_seen_at` timestamp. Please send it in RFC3339 format',
  )
  .option(
    '--last-notified-at:before <string>',
    'Fetch users last notified before the specified `last_notified_at` timestamp. Please send it in RFC3339 format',
  )
  .option(
    '--last-notified-at:after <string>',
    'Fetch users last notified after the specified `last_notified_at` timestamp. Please send it in RFC3339 format',
  )
  .option('--order-by <string>', 'Use it to order the returned list of users. Defaults to `created_at,DESC`')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async ({ paginate, maxItems, ...opts }, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = getClient(cmd).users.list(data, options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });

users
  .command('get')
  .description('Get user by ID')
  .argument('<user-id>', 'The user id is the MagicBell user id. Accepts a UUID')
  .action(async (userId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).users.get(userId, options);
    printJson(response);
  });

users
  .command('update')
  .description('Update a user')
  .argument(
    '<user-id>',
    'The user id is the MagicBell user id. Alternatively, provide an id like `email:theusersemail@example.com` or `external_id:theusersexternalid` as the user id.',
  )
  .option(
    '--external-id <string>',
    "A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
  )
  .option('--email <string>', "The user's email.")
  .option('--first-name <string>', "The user's first name.")
  .option('--last-name <string>', "The user's last name.")
  .option(
    '--custom-attributes <json>',
    "Any customer attributes that you'd like to associate with the user. You may want to use these attributes later when writing email templates, for example.",
  )
  .option('--phone-numbers <string...>', 'An array of phone numbers to use for sending SMS notifications.')
  .action(async (userId, opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).users.update(userId, data, options);
    printJson(response);
  });

users
  .command('delete')
  .description('Delete a user')
  .argument(
    '<user-id>',
    'The user id is the MagicBell user id. Alternatively, provide an id like `email:theusersemail@example.com` or `external_id:theusersexternalid` as the user id.',
  )
  .action(async (userId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).users.delete(userId, options);
    printJson(response);
  });

users
  .command('update-by-email')
  .description('Update a user identified by email')
  .argument('<user-email>', '')
  .option(
    '--external-id <string>',
    "A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
  )
  .option('--email <string>', "The user's email.")
  .option('--first-name <string>', "The user's first name.")
  .option('--last-name <string>', "The user's last name.")
  .option(
    '--custom-attributes <json>',
    "Any customer attributes that you'd like to associate with the user. You may want to use these attributes later when writing email templates, for example.",
  )
  .option('--phone-numbers <string...>', 'An array of phone numbers to use for sending SMS notifications.')
  .action(async (userEmail, opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).users.updateByEmail(userEmail, data, options);
    printJson(response);
  });

users
  .command('delete-by-email')
  .description('Delete a user identified by email')
  .argument('<user-email>', '')
  .action(async (userEmail, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).users.deleteByEmail(userEmail, options);
    printJson(response);
  });

users
  .command('update-by-external-id')
  .description('Update a user identified by external ID')
  .argument('<external-id>', '')
  .option(
    '--external-id <string>',
    "A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.",
  )
  .option('--email <string>', "The user's email.")
  .option('--first-name <string>', "The user's first name.")
  .option('--last-name <string>', "The user's last name.")
  .option(
    '--custom-attributes <json>',
    "Any customer attributes that you'd like to associate with the user. You may want to use these attributes later when writing email templates, for example.",
  )
  .option('--phone-numbers <string...>', 'An array of phone numbers to use for sending SMS notifications.')
  .action(async (externalId, opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).users.updateByExternalId(externalId, data, options);
    printJson(response);
  });

users
  .command('delete-by-external-id')
  .description('Delete a user identified by external ID')
  .argument('<external-id>', '')
  .action(async (externalId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).users.deleteByExternalId(externalId, options);
    printJson(response);
  });
