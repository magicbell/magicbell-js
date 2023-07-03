// This file is generated. Do not update manually!

import { getClient } from '../lib/client';
import { createCommand } from '../lib/commands';
import { parseOptions } from '../lib/options';
import { printJson } from '../lib/printer';

export const notifications = createCommand('notifications').description('Send and retrieve notifications');

notifications
  .command('create')
  .description('Create notifications')
  .option('--title <string>', 'Title of the notification.')
  .option(
    '--content <string>',
    'Content of the notification. If you provide HTML content, the notification inbox will render it correctly. It should not exceed 4MB.',
  )
  .option(
    '--action-url <string>',
    'A URL to redirect the user to when they click the notification in their notification inbox.',
  )
  .option(
    '--recipients <string...>',
    'Users to send the notification to. You can specify up to 1000 users in the request body or use matches to send a notification to any number of users.',
  )
  .option(
    '--custom-attributes <json>',
    'Set of key-value pairs that you can attach to a notification, 6KB at maximum. It accepts objects for the value of a key.',
  )
  .option(
    '--category <string>',
    'Category the notification belongs to. This is useful to allow users to set their preferences.',
  )
  .option('--topic <string>', 'Topic the notification belongs to. This is useful to create threads.')
  .option('--overrides <json>', 'Optional overrides to configure notifications per target destination.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.create(data, options);
    printJson(response);
  });

notifications
  .command('list')
  .description('Fetch notifications')
  .option(
    '--per-page <integer>',
    'A limit on the number of notifications to be returned. It can range between 1 and 100, and the default is 15.',
  )
  .option('--page <integer>', 'A parameter for use in pagination. Defaults to 1.')
  .option(
    '--read',
    'A filter on the notifications based on the read state. If false, only unread notifications will be returned. Defaults to null.',
  )
  .option(
    '--seen',
    'A filter on the notifications based on the seen state. If false, only unseen notifications will be returned. Defaults to null.',
  )
  .option(
    '--archived',
    'A filter on the notifications based on the archived state. If false, only unarchived notifications will be returned. Defaults to null.',
  )
  .option(
    '--categories <string...>',
    'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.',
  )
  .option('--topics <string...>', 'A filter on the notifications based on the topic.')
  .option('--paginate', 'Make additional HTTP requests to fetch all pages of results')
  .option('--max-items <number>', 'Maximum number of items to fetch', Number)
  .action(async ({ paginate, maxItems, ...opts }, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = getClient(cmd).notifications.list(data, options);

    if (paginate) {
      await response.forEach((notification, idx) => {
        printJson(notification);
        return !(maxItems && idx + 1 >= maxItems);
      });
    } else {
      await response.then((result) => printJson(result));
    }
  });

notifications
  .command('get')
  .description('Fetch notification by ID')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.get(notificationId, options);
    printJson(response);
  });

notifications
  .command('delete')
  .description('Delete a notification')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.delete(notificationId, options);
    printJson(response);
  });

notifications
  .command('mark-as-read')
  .description('Mark a notification as read')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.markAsRead(notificationId, options);
    printJson(response);
  });

notifications
  .command('mark-as-unread')
  .description('Mark a notification as unread')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.markAsUnread(notificationId, options);
    printJson(response);
  });

notifications
  .command('archive')
  .description('Archive a notification')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.archive(notificationId, options);
    printJson(response);
  });

notifications
  .command('unarchive')
  .description('Unarchive a notification')
  .argument('<notification-id>', 'ID of the user notification.')
  .action(async (notificationId, opts, cmd) => {
    const { options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.unarchive(notificationId, options);
    printJson(response);
  });

notifications
  .command('mark-all-read')
  .description('Mark all notifications as read')
  .option(
    '--archived',
    'A filter on the notifications based on the archived state. Specify false to select unarchived notifications. Defaults to null.',
  )
  .option(
    '--read',
    'A filter on the notifications based on the read state. Specify false to select unread notifications. Defaults to null.',
  )
  .option(
    '--seen',
    'A filter on the notifications based on the seen state. Specify false to select unseen notifications. Defaults to null.',
  )
  .option(
    '--categories <string...>',
    'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.',
  )
  .option('--topics <string...>', 'A filter on the notifications based on the topic.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.markAllRead(data, options);
    printJson(response);
  });

notifications
  .command('mark-all-seen')
  .description('Mark all notifications as seen')
  .option(
    '--archived',
    'A filter on the notifications based on the archived state. Specify false to select unarchived notifications. Defaults to null.',
  )
  .option(
    '--read',
    'A filter on the notifications based on the read state. Specify false to select unread notifications. Defaults to null.',
  )
  .option(
    '--seen',
    'A filter on the notifications based on the seen state. Specify false to select unseen notifications. Defaults to null.',
  )
  .option(
    '--categories <string...>',
    'A filter on the notifications based on the category. If you want to get uncategorized notifications, use the "uncategorized" value.',
  )
  .option('--topics <string...>', 'A filter on the notifications based on the topic.')
  .action(async (opts, cmd) => {
    const { data, options } = parseOptions(opts);

    const response = await getClient(cmd).notifications.markAllSeen(data, options);
    printJson(response);
  });
