import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const createUserTokenRequest = z.lazy(() => {
  return z.object({
    email: z.string().max(255).optional(),
    expiry: z.number().gte(1).optional(),
    externalId: z.string().max(255).optional(),
    name: z.string().max(255).optional(),
  });
});

/**
 *
 * @typedef  {CreateUserTokenRequest} createUserTokenRequest
 * @property {string} - The user's email.
 * @property {number} - The duration for which the token is valid (in seconds)
 * @property {string} - A unique string that MagicBell can utilize to identify the user uniquely. We recommend setting this attribute to the ID of the user in your database. Provide the external id if the user's email is unavailable.
 * @property {string} - The name of the token.
 */
export type CreateUserTokenRequest = z.infer<typeof createUserTokenRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const createUserTokenRequestResponse = z.lazy(() => {
  return z
    .object({
      email: z.string().max(255).optional(),
      expiry: z.number().gte(1).optional(),
      external_id: z.string().max(255).optional(),
      name: z.string().max(255).optional(),
    })
    .transform((data) => ({
      email: data['email'],
      expiry: data['expiry'],
      externalId: data['external_id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const createUserTokenRequestRequest = z.lazy(() => {
  return z
    .object({
      email: z.string().nullish(),
      expiry: z.number().nullish(),
      externalId: z.string().nullish(),
      name: z.string().nullish(),
    })
    .transform((data) => ({
      email: data['email'],
      expiry: data['expiry'],
      external_id: data['externalId'],
      name: data['name'],
    }));
});
