import { z } from 'zod';

import { Default_, default_, defaultRequest, defaultResponse } from './default_.js';
import { Unread, unread, unreadRequest, unreadResponse } from './unread.js';
import { Unseen, unseen, unseenRequest, unseenResponse } from './unseen.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const themeNotification = z.lazy(() => {
  return z.object({
    default: default_,
    unread: unread,
    unseen: unseen,
  });
});

/**
 *
 * @typedef  {ThemeNotification} themeNotification
 * @property {Default_}
 * @property {Unread}
 * @property {Unseen}
 */
export type ThemeNotification = z.infer<typeof themeNotification>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const themeNotificationResponse = z.lazy(() => {
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
export const themeNotificationRequest = z.lazy(() => {
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
