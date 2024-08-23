import { z } from 'zod';

import { oauth, oauthRequest, oauthResponse } from './oauth';
import { webhook, webhookRequest, webhookResponse } from './webhook';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackToken = z.lazy(() => {
  return z.object({
    oauth: oauth.optional(),
    webhook: webhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackToken} slackToken
 * @property {Oauth}
 * @property {Webhook}
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
      webhook: webhookResponse.optional(),
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
  return z.object({ oauth: oauthRequest.nullish(), webhook: webhookRequest.nullish() }).transform((data) => ({
    oauth: data['oauth'],
    webhook: data['webhook'],
  }));
});
