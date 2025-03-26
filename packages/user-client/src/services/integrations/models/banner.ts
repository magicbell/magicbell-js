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
 *
 * @typedef  {Banner} banner
 * @property {string}
 * @property {number}
 * @property {string}
 * @property {string}
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
