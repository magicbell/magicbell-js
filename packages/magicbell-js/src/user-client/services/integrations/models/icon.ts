import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
