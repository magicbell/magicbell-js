import { z } from 'zod';

/**
 * Zod schema for the Banner model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const banner = z.lazy(() => {
  return z.object({
    backgroundColor: z.string(),
    backgroundOpacity: z.number().optional(),
    fontSize: z.string(),
    textColor: z.string(),
  });
});

/**
 * Top banner styling options.
 * @typedef  {Banner} banner - Top banner styling options. - Top banner styling options.
 * @property {string} - Banner background color.
 * @property {number} - Opacity applied to the banner background.
 * @property {string} - Font size for banner text.
 * @property {string} - Banner text color.
 */
export type Banner = z.infer<typeof banner>;

/**
 * Zod schema for mapping API responses to the Banner application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const bannerResponse = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      backgroundOpacity: z.number().optional(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      backgroundOpacity: data['backgroundOpacity'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});

/**
 * Zod schema for mapping the Banner application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const bannerRequest = z.lazy(() => {
  return z
    .object({
      backgroundColor: z.string(),
      backgroundOpacity: z.number().optional(),
      fontSize: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      backgroundColor: data['backgroundColor'],
      backgroundOpacity: data['backgroundOpacity'],
      fontSize: data['fontSize'],
      textColor: data['textColor'],
    }));
});
