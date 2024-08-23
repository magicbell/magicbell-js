import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const tokens = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    expiresAt: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {Tokens} tokens
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Tokens = z.infer<typeof tokens>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const tokensResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      expires_at: z.string().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      expiresAt: data['expires_at'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const tokensRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      expiresAt: z.string().nullish(),
      id: z.string().nullish(),
      name: z.string().nullish(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      expires_at: data['expiresAt'],
      id: data['id'],
      name: data['name'],
    }));
});
