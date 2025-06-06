import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const replyTo = z.lazy(() => {
  return z.object({
    email: z.string(),
    name: z.string().optional().nullable(),
  });
});

/**
 *
 * @typedef  {ReplyTo} replyTo
 * @property {string} - The email address to reply to
 * @property {string} - The name to reply to
 */
export type ReplyTo = z.infer<typeof replyTo>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const replyToResponse = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const replyToRequest = z.lazy(() => {
  return z
    .object({
      email: z.string(),
      name: z.string().optional().nullable(),
    })
    .transform((data) => ({
      email: data['email'],
      name: data['name'],
    }));
});
