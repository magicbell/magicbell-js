import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const email = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    content: z.string().max(1048576).optional(),
    title: z.string().min(1).max(255).optional(),
  });
});

/**
 *
 * @typedef  {Email} email
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Email = z.infer<typeof email>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const emailResponse = z.lazy(() => {
  return z
    .object({
      action_url: z.string().max(2048).optional().nullable(),
      content: z.string().max(1048576).optional(),
      title: z.string().min(1).max(255).optional(),
    })
    .transform((data) => ({
      actionUrl: data['action_url'],
      content: data['content'],
      title: data['title'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const emailRequest = z.lazy(() => {
  return z
    .object({
      actionUrl: z.string().nullable().optional(),
      content: z.string().optional(),
      title: z.string().optional(),
    })
    .transform((data) => ({
      action_url: data['actionUrl'],
      content: data['content'],
      title: data['title'],
    }));
});
