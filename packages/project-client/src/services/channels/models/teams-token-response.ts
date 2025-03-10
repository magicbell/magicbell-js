import { z } from 'zod';

import {
  teamsTokenResponseWebhook,
  teamsTokenResponseWebhookRequest,
  teamsTokenResponseWebhookResponse,
} from './teams-token-response-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenResponse = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    updatedAt: z.string().optional().nullable(),
    webhook: teamsTokenResponseWebhook.optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenResponse} teamsTokenResponse
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {TeamsTokenResponseWebhook}
 */
export type TeamsTokenResponse = z.infer<typeof teamsTokenResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenResponseResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      updated_at: z.string().optional().nullable(),
      webhook: teamsTokenResponseWebhookResponse.optional(),
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
export const teamsTokenResponseRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string().nullish(),
      discardedAt: z.string().nullish(),
      id: z.string().nullish(),
      updatedAt: z.string().nullish(),
      webhook: teamsTokenResponseWebhookRequest.nullish(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      updated_at: data['updatedAt'],
      webhook: data['webhook'],
    }));
});
