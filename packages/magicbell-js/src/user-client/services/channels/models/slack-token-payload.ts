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
 * Zod schema for the SlackTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SlackTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
