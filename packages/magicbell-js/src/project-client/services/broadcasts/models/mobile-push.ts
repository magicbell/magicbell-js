import { z } from 'zod';

/**
 * Zod schema for the MobilePush model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const mobilePush = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    content: z.string().max(1048576).optional(),
    title: z.string().min(1).max(255).optional(),
  });
});

/**
 * Overrides for mobile push notifications.
 * @typedef  {MobilePush} mobilePush - Overrides for mobile push notifications. - Overrides for mobile push notifications.
 * @property {string} - The link associated with the channel-specific notification.
 * @property {string} - The channel-specific content.
 * @property {string} - The channel-specific title.
 */
export type MobilePush = z.infer<typeof mobilePush>;

/**
 * Zod schema for mapping API responses to the MobilePush application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the MobilePush application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
