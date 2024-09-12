import { z } from 'zod';

import { oauth, oauthRequest, oauthResponse } from './oauth.js';
import { slackTokenWebhook, slackTokenWebhookRequest, slackTokenWebhookResponse } from './slack-token-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackToken = z.lazy(() => {
  return z.object({
    oauth: oauth.optional(),
    webhook: slackTokenWebhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackToken} slackToken
 * @property {Oauth}
 * @property {SlackTokenWebhook}
 */
export type SlackToken = z.infer<typeof slackToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenResponse = z.lazy(() => {
  return z
    .object({
      oauth: oauthResponse.optional(),
      webhook: slackTokenWebhookResponse.optional(),
    })
    .transform((data) => ({
      oauth: data['oauth'],
      webhook: data['webhook'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenRequest = z.lazy(() => {
  return z.object({ oauth: oauthRequest.nullish(), webhook: slackTokenWebhookRequest.nullish() }).transform((data) => ({
    oauth: data['oauth'],
    webhook: data['webhook'],
  }));
});
