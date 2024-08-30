import { z } from 'zod';

import { default_, defaultRequest, defaultResponse } from './default_';
import { unread, unreadRequest, unreadResponse } from './unread';
import { unseen, unseenRequest, unseenResponse } from './unseen';

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
 *
 * @typedef  {Notification} notification
 * @property {Default_}
 * @property {Unread}
 * @property {Unseen}
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
    .object({ default: defaultRequest.nullish(), unread: unreadRequest.nullish(), unseen: unseenRequest.nullish() })
    .transform((data) => ({
      default: data['default'],
      unread: data['unread'],
      unseen: data['unseen'],
    }));
});
