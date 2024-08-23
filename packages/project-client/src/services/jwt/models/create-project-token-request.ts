import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const createProjectTokenRequest = z.lazy(() => {
  return z.object({
    expiry: z.number().gte(1).optional(),
    name: z.string().max(255),
  });
});

/**
 *
 * @typedef  {CreateProjectTokenRequest} createProjectTokenRequest
 * @property {number} - The duration for which the token is valid (in seconds)
 * @property {string} - The name of the token.
 */
export type CreateProjectTokenRequest = z.infer<typeof createProjectTokenRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const createProjectTokenRequestResponse = z.lazy(() => {
  return z
    .object({
      expiry: z.number().gte(1).optional(),
      name: z.string().max(255),
    })
    .transform((data) => ({
      expiry: data['expiry'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const createProjectTokenRequestRequest = z.lazy(() => {
  return z.object({ expiry: z.number().nullish(), name: z.string().nullish() }).transform((data) => ({
    expiry: data['expiry'],
    name: data['name'],
  }));
});
