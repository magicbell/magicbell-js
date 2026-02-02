import { z } from 'zod';

/**
 * Zod schema for the UnreadState model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const unreadState = z.lazy(() => {
  return z.object({
    color: z.string(),
  });
});

/**
 * State indicator styling for unread notifications.
 * @typedef  {UnreadState} unreadState - State indicator styling for unread notifications. - State indicator styling for unread notifications.
 * @property {string} - Color for the unread state indicator.
 */
export type UnreadState = z.infer<typeof unreadState>;

/**
 * Zod schema for mapping API responses to the UnreadState application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unreadStateResponse = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});

/**
 * Zod schema for mapping the UnreadState application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unreadStateRequest = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});
