import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfigFrom = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {SesConfigFrom} sesConfigFrom
 * @property {string} - The email address to send from
 * @property {string} - The name to send from
 */
export type SesConfigFrom = z.infer<typeof sesConfigFrom>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigFromResponse = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigFromRequest = z.lazy(() => {
  return z.object({ email: z.string().nullish(), name: z.string().nullish() }).transform((data) => ({
    email: data['email'],
    name: data['name'],
  }));
});
