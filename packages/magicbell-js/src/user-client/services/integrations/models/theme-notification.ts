import { z } from 'zod';

import { Default_, default_, defaultRequest, defaultResponse } from './default_.js';
import { Unread, unread, unreadRequest, unreadResponse } from './unread.js';
import { Unseen, unseen, unseenRequest, unseenResponse } from './unseen.js';

/**
 * Zod schema for the ThemeNotification model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const themeNotification = z.lazy(() => {
  return z.object({
    default: default_,
    unread: unread,
    unseen: unseen,
  });
});

/**
 * Styling overrides for notification list items.
 * @typedef  {ThemeNotification} themeNotification - Styling overrides for notification list items. - Styling overrides for notification list items.
 * @property {Default_} - Base styles applied to every notification item.
 * @property {Unread} - Overrides for unread notifications.
 * @property {Unseen} - Overrides for unseen notifications.
 */
export type ThemeNotification = z.infer<typeof themeNotification>;

/**
 * Zod schema for mapping API responses to the ThemeNotification application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the ThemeNotification application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
