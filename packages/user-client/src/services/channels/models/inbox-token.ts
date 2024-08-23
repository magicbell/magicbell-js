import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxToken = z.lazy(() => {
  return z.object({
    token: z.string(),
  });
});

/**
 *
 * @typedef  {InboxToken} inboxToken
 * @property {string}
 */
export type InboxToken = z.infer<typeof inboxToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenResponse = z.lazy(() => {
  return z
    .object({
      token: z.string(),
    })
    .transform((data) => ({
      token: data['token'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenRequest = z.lazy(() => {
  return z.object({ token: z.string().nullish() }).transform((data) => ({
    token: data['token'],
  }));
});
