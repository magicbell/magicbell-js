import { z } from 'zod';

/**
 * Zod schema for the UnseenBadge model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const unseenBadge = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
  });
});

/**
 * Badge styling for unseen notification counts.
 * @typedef  {UnseenBadge} unseenBadge - Badge styling for unseen notification counts. - Badge styling for unseen notification counts.
 * @property {string} - Badge background color.
 */
export type UnseenBadge = z.infer<typeof unseenBadge>;

/**
 * Zod schema for mapping API responses to the UnseenBadge application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenBadgeResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});

/**
 * Zod schema for mapping the UnseenBadge application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const unseenBadgeRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
    }));
});
