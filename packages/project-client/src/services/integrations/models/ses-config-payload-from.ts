import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfigPayloadFrom = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {SesConfigPayloadFrom} sesConfigPayloadFrom
 * @property {string} - The email address to send from
 * @property {string} - The name to send from
 */
export type SesConfigPayloadFrom = z.infer<typeof sesConfigPayloadFrom>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigPayloadFromResponse = z.lazy(() => {
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
export const sesConfigPayloadFromRequest = z.lazy(() => {
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
