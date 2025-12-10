import { z } from 'zod';

import { Default_, default_, defaultRequest, defaultResponse } from './default_.js';
import { Unread, unread, unreadRequest, unreadResponse } from './unread.js';
import { Unseen, unseen, unseenRequest, unseenResponse } from './unseen.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const notification = z.lazy(() => {
  return z.object({
    default: default_,
    unread: unread,
    unseen: unseen,
  });
});

/**
 * Styling overrides for notification list items.
 * @typedef  {Notification} notification - Styling overrides for notification list items. - Styling overrides for notification list items.
 * @property {Default_} - Base styles applied to every notification item.
 * @property {Unread} - Overrides for unread notifications.
 * @property {Unseen} - Overrides for unseen notifications.
 */
export type Notification = z.infer<typeof notification>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const notificationResponse = z.lazy(() => {
  return z
    .object({
      default: defaultResponse,
      unread: unreadResponse,
      unseen: unseenResponse,
    })
    .transform((data) => ({
      default: data['default'],
      unread: data['unread'],
      unseen: data['unseen'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const notificationRequest = z.lazy(() => {
  return z
    .object({
      default: defaultRequest,
      unread: unreadRequest,
      unseen: unseenRequest,
    })
    .transform((data) => ({
      default: data['default'],
      unread: data['unread'],
      unseen: data['unseen'],
    }));
});
