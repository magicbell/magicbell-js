import { z } from 'zod';

import { UnreadHover, unreadHover, unreadHoverRequest, unreadHoverResponse } from './unread-hover.js';
import { UnreadState, unreadState, unreadStateRequest, unreadStateResponse } from './unread-state.js';

/**
 * Zod schema for the Unread model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the Unread application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Unread application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
