import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxToken = z.lazy(() => {
  return z.object({
    connectionId: z.string().optional().nullable(),
    token: z.string().min(64),
  });
});

/**
 *
 * @typedef  {InboxToken} inboxToken
 * @property {string}
 * @property {string}
 */
export type InboxToken = z.infer<typeof inboxToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenResponse1 = z.lazy(() => {
  return z
    .object({
      connection_id: z.string().optional().nullable(),
      token: z.string().min(64),
    })
    .transform((data) => ({
      connectionId: data['connection_id'],
      token: data['token'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenRequest = z.lazy(() => {
  return z
    .object({
      connectionId: z.string().optional().nullable(),
      token: z.string().min(64),
    })
    .transform((data) => ({
      connection_id: data['connectionId'],
      token: data['token'],
    }));
});
