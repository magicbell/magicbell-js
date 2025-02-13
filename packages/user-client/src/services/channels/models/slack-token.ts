import { z } from 'zod';

import { slackTokenOauth, slackTokenOauthRequest, slackTokenOauthResponse } from './slack-token-oauth.js';
import { slackTokenWebhook, slackTokenWebhookRequest, slackTokenWebhookResponse } from './slack-token-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackToken = z.lazy(() => {
  return z.object({
    oauth: slackTokenOauth.optional(),
    webhook: slackTokenWebhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackToken} slackToken
 * @property {SlackTokenOauth}
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
      oauth: slackTokenOauthResponse.optional(),
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
  return z
    .object({ oauth: slackTokenOauthRequest.nullish(), webhook: slackTokenWebhookRequest.nullish() })
    .transform((data) => ({
      oauth: data['oauth'],
      webhook: data['webhook'],
    }));
});
