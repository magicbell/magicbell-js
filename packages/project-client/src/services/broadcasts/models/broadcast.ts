import { z } from 'zod';

import { broadcastStatus, broadcastStatusRequest, broadcastStatusResponse } from './broadcast-status.js';
import { category, categoryRequest, categoryResponse } from './category.js';
import { overrides, overridesRequest, overridesResponse } from './overrides.js';
import { topic, topicRequest, topicResponse } from './topic.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const broadcast = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    category: category.optional(),
    content: z.string().max(10485760).optional().nullable(),
    createdAt: z.string().optional(),
    customAttributes: z.any().optional().nullable(),
    id: z.string().optional(),
    overrides: overrides.optional().nullable(),
    recipients: z.array(z.any()).min(1).max(1000),
    status: broadcastStatus.optional().nullable(),
    title: z.string().min(1).max(255),
    topic: topic.optional(),
  });
});

/**
 *
 * @typedef  {Broadcast} broadcast
 * @property {string}
 * @property {Category}
 * @property {string}
 * @property {string} - The timestamp when the broadcast was created.
 * @property {any}
 * @property {string} - The unique id for this broadcast.
 * @property {Overrides}
 * @property {any[]}
 * @property {BroadcastStatus}
 * @property {string}
 * @property {Topic}
 */
export type Broadcast = z.infer<typeof broadcast>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastResponse = z.lazy(() => {
  return z
    .object({
      action_url: z.string().max(2048).optional().nullable(),
      category: categoryResponse.optional(),
      content: z.string().max(10485760).optional().nullable(),
      created_at: z.string().optional(),
      custom_attributes: z.any().optional().nullable(),
      id: z.string().optional(),
      overrides: overridesResponse.optional().nullable(),
      recipients: z.array(z.any()).min(1).max(1000),
      status: broadcastStatusResponse.optional().nullable(),
      title: z.string().min(1).max(255),
      topic: topicResponse.optional(),
    })
    .transform((data) => ({
      actionUrl: data['action_url'],
      category: data['category'],
      content: data['content'],
      createdAt: data['created_at'],
      customAttributes: data['custom_attributes'],
      id: data['id'],
      overrides: data['overrides'],
      recipients: data['recipients'],
      status: data['status'],
      title: data['title'],
      topic: data['topic'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastRequest = z.lazy(() => {
  return z
    .object({
      actionUrl: z.string().nullish(),
      category: categoryRequest.nullish(),
      content: z.string().nullish(),
      createdAt: z.string().nullish(),
      customAttributes: z.any().nullish(),
      id: z.string().nullish(),
      overrides: overridesRequest.nullish(),
      recipients: z.array(z.any()).nullish(),
      status: broadcastStatusRequest.nullish(),
      title: z.string().nullish(),
      topic: topicRequest.nullish(),
    })
    .transform((data) => ({
      action_url: data['actionUrl'],
      category: data['category'],
      content: data['content'],
      created_at: data['createdAt'],
      custom_attributes: data['customAttributes'],
      id: data['id'],
      overrides: data['overrides'],
      recipients: data['recipients'],
      status: data['status'],
      title: data['title'],
      topic: data['topic'],
    }));
});
