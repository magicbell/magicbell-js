import { z } from 'zod';

/**
 * Zod schema for the InboxTokenResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const inboxTokenResponse = z.lazy(() => {
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
 * @typedef  {InboxTokenResponse} inboxTokenResponse
 * @property {string} - Realtime connection ID to restrict delivery to a specific Ably connection.
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The unique identifier for the token.
 * @property {string} - The in-app inbox token generated for this user.
 * @property {string} - The timestamp when the token metadata last changed.
 */
export type InboxTokenResponse = z.infer<typeof inboxTokenResponse>;

/**
 * Zod schema for mapping API responses to the InboxTokenResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxTokenResponseResponse = z.lazy(() => {
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
 * Zod schema for mapping the InboxTokenResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxTokenResponseRequest = z.lazy(() => {
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
