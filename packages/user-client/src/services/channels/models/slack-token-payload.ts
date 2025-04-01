import { z } from 'zod';

import {
  SlackTokenPayloadOauth,
  slackTokenPayloadOauth,
  slackTokenPayloadOauthRequest,
  slackTokenPayloadOauthResponse,
} from './slack-token-payload-oauth.js';
import {
  SlackTokenPayloadWebhook,
  slackTokenPayloadWebhook,
  slackTokenPayloadWebhookRequest,
  slackTokenPayloadWebhookResponse,
} from './slack-token-payload-webhook.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackTokenPayload = z.lazy(() => {
  return z.object({
    oauth: slackTokenPayloadOauth.optional(),
    webhook: slackTokenPayloadWebhook.optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenPayload} slackTokenPayload
 * @property {SlackTokenPayloadOauth}
 * @property {SlackTokenPayloadWebhook} - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 */
export type SlackTokenPayload = z.infer<typeof slackTokenPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      oauth: slackTokenPayloadOauthResponse.optional(),
      webhook: slackTokenPayloadWebhookResponse.optional(),
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
export const slackTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      oauth: slackTokenPayloadOauthRequest.optional(),
      webhook: slackTokenPayloadWebhookRequest.optional(),
    })
    .transform((data) => ({
      oauth: data['oauth'],
      webhook: data['webhook'],
    }));
});
