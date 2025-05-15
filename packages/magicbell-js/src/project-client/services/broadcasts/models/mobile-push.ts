import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mobilePush = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    content: z.string().max(1048576).optional(),
    title: z.string().min(1).max(255).optional(),
  });
});

/**
 *
 * @typedef  {MobilePush} mobilePush
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type MobilePush = z.infer<typeof mobilePush>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mobilePushResponse = z.lazy(() => {
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
export const mobilePushRequest = z.lazy(() => {
  return z
    .object({
      actionUrl: z.string().max(2048).optional().nullable(),
      content: z.string().max(1048576).optional(),
      title: z.string().min(1).max(255).optional(),
    })
    .transform((data) => ({
      action_url: data['actionUrl'],
      content: data['content'],
      title: data['title'],
    }));
});
