import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const accessToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional(),
    expiresAt: z.string().optional(),
    token: z.string(),
    tokenId: z.string(),
  });
});

/**
 *
 * @typedef  {AccessToken} accessToken
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type AccessToken = z.infer<typeof accessToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const accessTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional(),
      expires_at: z.string().optional(),
      token: z.string(),
      token_id: z.string(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      expiresAt: data['expires_at'],
      token: data['token'],
      tokenId: data['token_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const accessTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      discardedAt: z.string().nullish(),
      expiresAt: z.string().nullish(),
      token: z.string().nullish(),
      tokenId: z.string().nullish(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      expires_at: data['expiresAt'],
      token: data['token'],
      token_id: data['tokenId'],
    }));
});
