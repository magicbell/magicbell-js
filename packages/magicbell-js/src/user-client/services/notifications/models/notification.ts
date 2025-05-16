import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const notification = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    archivedAt: z.string().optional().nullable(),
    category: z.string().max(100).optional().nullable(),
    content: z.string().max(10485760).optional().nullable(),
    createdAt: z.string(),
    customAttributes: z.any().optional().nullable(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    readAt: z.string().optional().nullable(),
    seenAt: z.string().optional().nullable(),
    sentAt: z.string().optional().nullable(),
    title: z.string().min(1).max(255),
    topic: z.string().max(100).optional().nullable(),
    updatedAt: z.string(),
    userId: z.string(),
  });
});

/**
 *
 * @typedef  {Notification} notification
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {any}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Notification = z.infer<typeof notification>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const notificationResponse = z.lazy(() => {
  return z
    .object({
      action_url: z.string().max(2048).optional().nullable(),
      archived_at: z.string().optional().nullable(),
      category: z.string().max(100).optional().nullable(),
      content: z.string().max(10485760).optional().nullable(),
      created_at: z.string(),
      custom_attributes: z.any().optional().nullable(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      read_at: z.string().optional().nullable(),
      seen_at: z.string().optional().nullable(),
      sent_at: z.string().optional().nullable(),
      title: z.string().min(1).max(255),
      topic: z.string().max(100).optional().nullable(),
      updated_at: z.string(),
      user_id: z.string(),
    })
    .transform((data) => ({
      actionUrl: data['action_url'],
      archivedAt: data['archived_at'],
      category: data['category'],
      content: data['content'],
      createdAt: data['created_at'],
      customAttributes: data['custom_attributes'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      readAt: data['read_at'],
      seenAt: data['seen_at'],
      sentAt: data['sent_at'],
      title: data['title'],
      topic: data['topic'],
      updatedAt: data['updated_at'],
      userId: data['user_id'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const notificationRequest = z.lazy(() => {
  return z
    .object({
      actionUrl: z.string().max(2048).optional().nullable(),
      archivedAt: z.string().optional().nullable(),
      category: z.string().max(100).optional().nullable(),
      content: z.string().max(10485760).optional().nullable(),
      createdAt: z.string(),
      customAttributes: z.any().optional().nullable(),
      discardedAt: z.string().optional().nullable(),
      id: z.string(),
      readAt: z.string().optional().nullable(),
      seenAt: z.string().optional().nullable(),
      sentAt: z.string().optional().nullable(),
      title: z.string().min(1).max(255),
      topic: z.string().max(100).optional().nullable(),
      updatedAt: z.string(),
      userId: z.string(),
    })
    .transform((data) => ({
      action_url: data['actionUrl'],
      archived_at: data['archivedAt'],
      category: data['category'],
      content: data['content'],
      created_at: data['createdAt'],
      custom_attributes: data['customAttributes'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      read_at: data['readAt'],
      seen_at: data['seenAt'],
      sent_at: data['sentAt'],
      title: data['title'],
      topic: data['topic'],
      updated_at: data['updatedAt'],
      user_id: data['userId'],
    }));
});
