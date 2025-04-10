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
 *
 * @typedef  {Icon} icon
 * @property {string}
 * @property {string}
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
