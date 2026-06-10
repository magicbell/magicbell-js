import { z } from 'zod';

/**
 * Zod schema for the UnseenHover model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const unseenHover = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 * Hover styles for unseen notifications.
 * @typedef  {UnseenHover} unseenHover - Hover styles for unseen notifications. - Hover styles for unseen notifications.
 * @property {string} - Background color on hover for unseen notifications.
 */
export type UnseenHover = z.infer<typeof unseenHover>;

/**
 * Zod schema for mapping API responses to the UnseenHover application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenHoverResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});

/**
 * Zod schema for mapping the UnseenHover application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenHoverRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
