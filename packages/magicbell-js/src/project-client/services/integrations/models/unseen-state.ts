import { z } from 'zod';

/**
 * Zod schema for the UnseenState model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const unseenState = z.lazy(() => {
  return z.object({
    color: z.string(),
  });
});

/**
 * State indicator styling for unseen notifications.
 * @typedef  {UnseenState} unseenState - State indicator styling for unseen notifications. - State indicator styling for unseen notifications.
 * @property {string} - Color for the unseen state indicator.
 */
export type UnseenState = z.infer<typeof unseenState>;

/**
 * Zod schema for mapping API responses to the UnseenState application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenStateResponse = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});

/**
 * Zod schema for mapping the UnseenState application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenStateRequest = z.lazy(() => {
  return z
    .object({
      color: z.string(),
    })
    .transform((data) => ({
      color: data['color'],
    }));
});
