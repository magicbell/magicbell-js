import { z } from 'zod';

/**
 * Zod schema for the Icon model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const icon = z.lazy(() => {
  return z.object({
    borderColor: z.string(),
    width: z.string(),
  });
});

/**
 * Launcher icon styling overrides.
 * @typedef  {Icon} icon - Launcher icon styling overrides. - Launcher icon styling overrides.
 * @property {string} - CSS color used for the icon border.
 * @property {string} - Width of the launcher icon (any CSS length).
 */
export type Icon = z.infer<typeof icon>;

/**
 * Zod schema for mapping API responses to the Icon application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const iconResponse = z.lazy(() => {
  return z
    .object({
      borderColor: z.string(),
      width: z.string(),
    })
    .transform((data) => ({
      borderColor: data['borderColor'],
      width: data['width'],
    }));
});

/**
 * Zod schema for mapping the Icon application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const iconRequest = z.lazy(() => {
  return z
    .object({
      borderColor: z.string(),
      width: z.string(),
    })
    .transform((data) => ({
      borderColor: data['borderColor'],
      width: data['width'],
    }));
});
