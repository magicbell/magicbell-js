import { z } from 'zod';

import {
  TeamsTokenWebhook,
  teamsTokenWebhook,
  teamsTokenWebhookRequest,
  teamsTokenWebhookResponse,
} from './teams-token-webhook.js';

/**
 * Zod schema for the TeamsToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The unique identifier for the token.
 * @property {string} - The timestamp when the token metadata last changed.
 * @property {TeamsTokenWebhook}
 */
export type TeamsToken = z.infer<typeof teamsToken>;

/**
 * Zod schema for mapping API responses to the TeamsToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TeamsToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
