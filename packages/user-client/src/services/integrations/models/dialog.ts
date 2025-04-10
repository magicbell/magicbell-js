import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const dialog = z.lazy(() => {
  return z.object({
    accentColor: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
  });
});

/**
 *
 * @typedef  {Dialog} dialog
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Dialog = z.infer<typeof dialog>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const dialogResponse = z.lazy(() => {
  return z
    .object({
      accentColor: z.string(),
      backgroundColor: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      accentColor: data['accentColor'],
      backgroundColor: data['backgroundColor'],
      textColor: data['textColor'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const dialogRequest = z.lazy(() => {
  return z
    .object({
      accentColor: z.string(),
      backgroundColor: z.string(),
      textColor: z.string(),
    })
    .transform((data) => ({
      accentColor: data['accentColor'],
      backgroundColor: data['backgroundColor'],
      textColor: data['textColor'],
    }));
});
