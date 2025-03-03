import { z } from 'zod';

import { teamsTokenWebhook, teamsTokenWebhookRequest, teamsTokenWebhookResponse } from './teams-token-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const teamsToken = z.lazy(() => {
  return z.object({
    webhook: teamsTokenWebhook.optional(),
  });
});

/**
 *
 * @typedef  {TeamsToken} teamsToken
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
      webhook: teamsTokenWebhookResponse.optional(),
    })
    .transform((data) => ({
      webhook: data['webhook'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const teamsTokenRequest = z.lazy(() => {
  return z.object({ webhook: teamsTokenWebhookRequest.nullish() }).transform((data) => ({
    webhook: data['webhook'],
  }));
});
