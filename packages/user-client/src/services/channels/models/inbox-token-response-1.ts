import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inboxTokenResponse1 = z.lazy(() => {
  return z.object({
    connectionId: z.string().optional().nullable(),
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    token: z.string().min(64),
    updatedAt: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {InboxTokenResponse1} inboxTokenResponse1
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type InboxTokenResponse1 = z.infer<typeof inboxTokenResponse1>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenResponse1Response = z.lazy(() => {
  return z
    .object({
      connection_id: z.string().optional().nullable(),
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      token: z.string().min(64),
      updated_at: z.string().optional().nullable(),
    })
    .transform((data) => ({
      connectionId: data['connection_id'],
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      token: data['token'],
      updatedAt: data['updated_at'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inboxTokenResponse1Request = z.lazy(() => {
  return z
    .object({
      connectionId: z.string().optional().nullable(),
      createdAt: z.string(),
      discardedAt: z.string().optional().nullable(),
      id: z.string(),
      token: z.string().min(64),
      updatedAt: z.string().optional().nullable(),
    })
    .transform((data) => ({
      connection_id: data['connectionId'],
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      token: data['token'],
      updated_at: data['updatedAt'],
    }));
});
