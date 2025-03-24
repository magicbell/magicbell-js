import { z } from 'zod';

import { oauth, oauthRequest, oauthResponse } from './oauth.js';
import {
  slackTokenResponseWebhook,
  slackTokenResponseWebhookRequest,
  slackTokenResponseWebhookResponse,
} from './slack-token-response-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenResponse = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    oauth: oauth.optional(),
    updatedAt: z.string().optional().nullable(),
    webhook: slackTokenResponseWebhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenResponse} slackTokenResponse
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {Oauth}
 * @property {string}
 * @property {SlackTokenResponseWebhook} - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 */
export type SlackTokenResponse = z.infer<typeof slackTokenResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenResponseResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      oauth: oauthResponse.optional(),
      updated_at: z.string().optional().nullable(),
      webhook: slackTokenResponseWebhookResponse.optional(),
    })
    .transform((data) => ({
      createdAt: data['created_at'],
      discardedAt: data['discarded_at'],
      id: data['id'],
      oauth: data['oauth'],
      updatedAt: data['updated_at'],
      webhook: data['webhook'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenResponseRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      discardedAt: z.string().nullable().optional(),
      id: z.string(),
      oauth: oauthRequest.optional(),
      updatedAt: z.string().nullable().optional(),
      webhook: slackTokenResponseWebhookRequest.optional(),
    })
    .transform((data) => ({
      created_at: data['createdAt'],
      discarded_at: data['discardedAt'],
      id: data['id'],
      oauth: data['oauth'],
      updated_at: data['updatedAt'],
      webhook: data['webhook'],
    }));
});
