import { z } from 'zod';

/**
 * Zod schema for the Images model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const images = z.lazy(() => {
  return z.object({
    emptyInboxUrl: z.string(),
  });
});

/**
 * Image overrides for assets used in the inbox UI.
 * @typedef  {Images} images - Image overrides for assets used in the inbox UI. - Image overrides for assets used in the inbox UI.
 * @property {string} - URL for the illustration shown when the inbox is empty.
 */
export type Images = z.infer<typeof images>;

/**
 * Zod schema for mapping API responses to the Images application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const imagesResponse = z.lazy(() => {
  return z
    .object({
      emptyInboxUrl: z.string(),
    })
    .transform((data) => ({
      emptyInboxUrl: data['emptyInboxUrl'],
    }));
});

/**
 * Zod schema for mapping the Images application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const imagesRequest = z.lazy(() => {
  return z
    .object({
      emptyInboxUrl: z.string(),
    })
    .transform((data) => ({
      emptyInboxUrl: data['emptyInboxUrl'],
    }));
});
