import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
