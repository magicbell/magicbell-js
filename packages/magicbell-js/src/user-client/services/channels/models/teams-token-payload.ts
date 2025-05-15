import { z } from 'zod';

import {
  TeamsTokenPayloadWebhook,
  teamsTokenPayloadWebhook,
  teamsTokenPayloadWebhookRequest,
  teamsTokenPayloadWebhookResponse,
} from './teams-token-payload-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsTokenPayload = z.lazy(() => {
  return z.object({
    webhook: teamsTokenPayloadWebhook.optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenPayload} teamsTokenPayload
 * @property {TeamsTokenPayloadWebhook}
 */
export type TeamsTokenPayload = z.infer<typeof teamsTokenPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      webhook: teamsTokenPayloadWebhookResponse.optional(),
    })
    .transform((data) => ({
      webhook: data['webhook'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      webhook: teamsTokenPayloadWebhookRequest.optional(),
    })
    .transform((data) => ({
      webhook: data['webhook'],
    }));
});
