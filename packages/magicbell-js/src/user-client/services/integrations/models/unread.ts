import { z } from 'zod';

import { UnreadHover, unreadHover, unreadHoverRequest, unreadHoverResponse } from './unread-hover.js';
import { UnreadState, unreadState, unreadStateRequest, unreadStateResponse } from './unread-state.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unread = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    hover: unreadHover.optional(),
    state: unreadState.optional(),
    textColor: z.string(),
  });
});

/**
 * Overrides for unread notifications.
 * @typedef  {Unread} unread - Overrides for unread notifications. - Overrides for unread notifications.
 * @property {string} - Background color applied to unread notifications.
 * @property {UnreadHover} - Hover styles for unread notifications.
 * @property {UnreadState} - State indicator styling for unread notifications.
 * @property {string} - Text color used when a notification is unread.
 */
export type Unread = z.infer<typeof unread>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unreadResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unreadHoverResponse.optional(),
      state: unreadStateResponse.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const unreadRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      hover: unreadHoverRequest.optional(),
      state: unreadStateRequest.optional(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      hover: data['hover'],
      state: data['state'],
      textColor: data['textColor'],
    }));
});
