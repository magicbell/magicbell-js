import { z } from 'zod';

/**
 * Zod schema for the InboxToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {string} - Realtime connection ID to restrict delivery to a specific Ably connection.
 * @property {string} - The in-app inbox token generated for this user.
 */
export type InboxToken = z.infer<typeof inboxToken>;

/**
 * Zod schema for mapping API responses to the InboxToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the InboxToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
