import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const unreadHover = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 * Hover styles for unread notifications.
 * @typedef  {UnreadHover} unreadHover - Hover styles for unread notifications. - Hover styles for unread notifications.
 * @property {string} - Background color on hover for unread notifications.
 */
export type UnreadHover = z.infer<typeof unreadHover>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const unreadHoverResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const unreadHoverRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
