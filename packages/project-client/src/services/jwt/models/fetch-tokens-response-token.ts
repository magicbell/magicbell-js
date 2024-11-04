import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fetchTokensResponseToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional(),
    expiresAt: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
  });
});

/**
 *
 * @typedef  {FetchTokensResponseToken} fetchTokensResponseToken
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type FetchTokensResponseToken = z.infer<typeof fetchTokensResponseToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fetchTokensResponseTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional(),
      expires_at: z.string().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      expiresAt: data['expires_at'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const fetchTokensResponseTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      discardedAt: z.string().nullish(),
      expiresAt: z.string().nullish(),
      id: z.string().nullish(),
      name: z.string().nullish(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      expires_at: data['expiresAt'],
      id: data['id'],
      name: data['name'],
    }));
});
