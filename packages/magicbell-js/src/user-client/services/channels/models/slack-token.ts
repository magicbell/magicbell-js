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
 * Zod schema for the SlackToken model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * @property {string} - The timestamp when the token was created.
 * @property {string} - The timestamp when the token was discarded, if applicable.
 * @property {string} - The unique identifier for the token.
 * @property {SlackTokenOauth}
 * @property {string} - The timestamp when the token metadata last changed.
 * @property {SlackTokenWebhook} - Obtained directly from the incoming_webhook object in the installation response from the Slack API.
 */
export type SlackToken = z.infer<typeof slackToken>;

/**
 * Zod schema for mapping API responses to the SlackToken application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackToken application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
