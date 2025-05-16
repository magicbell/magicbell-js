import { z } from 'zod';

import {
  SlackTokenOauth,
  slackTokenOauth,
  slackTokenOauthRequest,
  slackTokenOauthResponse,
} from './slack-token-oauth.js';
import {
  SlackTokenWebhook,
  slackTokenWebhook,
  slackTokenWebhookRequest,
  slackTokenWebhookResponse,
} from './slack-token-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackToken = z.lazy(() => {
  return z.object({
    createdAt: z.string(),
    discardedAt: z.string().optional().nullable(),
    id: z.string(),
    oauth: slackTokenOauth.optional(),
    updatedAt: z.string().optional().nullable(),
    webhook: slackTokenWebhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackToken} slackToken
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {SlackTokenOauth}
 * @property {string}
 * @property {SlackTokenWebhook} - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 */
export type SlackToken = z.infer<typeof slackToken>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenResponse = z.lazy(() => {
  return z
    .object({
      created_at: z.string(),
      discarded_at: z.string().optional().nullable(),
      id: z.string(),
      oauth: slackTokenOauthResponse.optional(),
      updated_at: z.string().optional().nullable(),
      webhook: slackTokenWebhookResponse.optional(),
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
export const slackTokenRequest = z.lazy(() => {
  return z
    .object({
      createdAt: z.string(),
      discardedAt: z.string().optional().nullable(),
      id: z.string(),
      oauth: slackTokenOauthRequest.optional(),
      updatedAt: z.string().optional().nullable(),
      webhook: slackTokenWebhookRequest.optional(),
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
