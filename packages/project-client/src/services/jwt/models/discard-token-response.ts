import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const discardTokenResponse = z.lazy(() => {
  return z.object({
    discardedAt: z.string(),
    tokenId: z.string(),
  });
});

/**
 *
 * @typedef  {DiscardTokenResponse} discardTokenResponse
 * @property {string}
 * @property {string}
 */
export type DiscardTokenResponse = z.infer<typeof discardTokenResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const discardTokenResponseResponse = z.lazy(() => {
  return z
    .object({
      discarded_at: z.string(),
      token_id: z.string(),
    })
    .transform((data) => ({
      discardedAt: data['discarded_at'],
      tokenId: data['token_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const discardTokenResponseRequest = z.lazy(() => {
  return z.object({ discardedAt: z.string(), tokenId: z.string() }).transform((data) => ({
    discarded_at: data['discardedAt'],
    token_id: data['tokenId'],
  }));
});
