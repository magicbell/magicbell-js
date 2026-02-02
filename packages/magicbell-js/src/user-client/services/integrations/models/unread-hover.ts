import { z } from 'zod';

/**
 * Zod schema for the UnreadHover model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the UnreadHover application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the UnreadHover application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
