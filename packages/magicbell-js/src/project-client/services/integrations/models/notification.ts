import { z } from 'zod';

import { Default_, default_, defaultRequest, defaultResponse } from './default_.js';
import { Unread, unread, unreadRequest, unreadResponse } from './unread.js';
import { Unseen, unseen, unseenRequest, unseenResponse } from './unseen.js';

/**
 * Zod schema for the Notification model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the Notification application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Notification application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
