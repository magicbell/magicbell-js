import { z } from 'zod';

import {
  TeamsTokenPayloadWebhook,
  teamsTokenPayloadWebhook,
  teamsTokenPayloadWebhookRequest,
  teamsTokenPayloadWebhookResponse,
} from './teams-token-payload-webhook.js';

/**
 * Zod schema for the TeamsTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the TeamsTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TeamsTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
