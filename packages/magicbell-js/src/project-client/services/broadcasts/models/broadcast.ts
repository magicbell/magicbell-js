import { z } from 'zod';

import { User, user, userRequest, userResponse } from '../../common/user.js';
import {
  BroadcastStatus,
  broadcastStatus,
  broadcastStatusRequest,
  broadcastStatusResponse,
} from './broadcast-status.js';
import { Overrides, overrides, overridesRequest, overridesResponse } from './overrides.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const broadcast = z.lazy(() => {
  return z.object({
    actionUrl: z.string().max(2048).optional().nullable(),
    category: z
      .string()
      .max(255)
      .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
      .optional()
      .nullable(),
    content: z.string().max(10485760).optional().nullable(),
    createdAt: z.string().optional(),
    customAttributes: z.any().optional().nullable(),
    id: z.string().optional(),
    overrides: overrides.optional().nullable(),
    recipients: z.array(user).min(1).max(1000).nullable(),
    status: broadcastStatus.optional(),
    title: z.string().min(1).max(255),
    topic: z
      .string()
      .max(255)
      .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
      .optional()
      .nullable(),
  });
});

/**
 *
 * @typedef  {Broadcast} broadcast
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string} - The timestamp when the broadcast was created.
 * @property {any}
 * @property {string} - The unique id for this broadcast.
 * @property {Overrides}
 * @property {User[]}
 * @property {BroadcastStatus}
 * @property {string}
 * @property {string}
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
      category: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional()
        .nullable(),
      content: z.string().max(10485760).optional().nullable(),
      created_at: z.string().optional(),
      custom_attributes: z.any().optional().nullable(),
      id: z.string().optional(),
      overrides: overridesResponse.optional().nullable(),
      recipients: z.array(userResponse).min(1).max(1000).nullable(),
      status: broadcastStatusResponse.optional(),
      title: z.string().min(1).max(255),
      topic: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional()
        .nullable(),
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
      actionUrl: z.string().max(2048).optional().nullable(),
      category: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional()
        .nullable(),
      content: z.string().max(10485760).optional().nullable(),
      createdAt: z.string().optional(),
      customAttributes: z.any().optional().nullable(),
      id: z.string().optional(),
      overrides: overridesRequest.optional().nullable(),
      recipients: z.array(userRequest).min(1).max(1000).nullable(),
      status: broadcastStatusRequest.optional(),
      title: z.string().min(1).max(255),
      topic: z
        .string()
        .max(255)
        .regex(/^[A-Za-z0-9_\.\-\/:]+$/)
        .optional()
        .nullable(),
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
