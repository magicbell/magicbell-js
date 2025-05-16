import { z } from 'zod';

import {
  TeamsTokenWebhook,
  teamsTokenWebhook,
  teamsTokenWebhookRequest,
  teamsTokenWebhookResponse,
} from './teams-token-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    updatedAt: z.string().optional().nullable(),
    webhook: teamsTokenWebhook.optional(),
  });
});

/**
 *
 * @typedef  {TeamsToken} teamsToken
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {TeamsTokenWebhook}
 */
export type TeamsToken = z.infer<typeof teamsToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      updated_at: z.string().optional().nullable(),
      webhook: teamsTokenWebhookResponse.optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      updatedAt: data['updated_at'],
      webhook: data['webhook'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      discardedAt: z.string().optional().nullable(),
      id: z.string(),
      updatedAt: z.string().optional().nullable(),
      webhook: teamsTokenWebhookRequest.optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      updated_at: data['updatedAt'],
      webhook: data['webhook'],
    }));
});
