import { z } from 'zod';

import {
  SendgridConfigPayloadFrom,
  sendgridConfigPayloadFrom,
  sendgridConfigPayloadFromRequest,
  sendgridConfigPayloadFromResponse,
} from './sendgrid-config-payload-from.js';
import {
  SendgridConfigPayloadReplyTo,
  sendgridConfigPayloadReplyTo,
  sendgridConfigPayloadReplyToRequest,
  sendgridConfigPayloadReplyToResponse,
} from './sendgrid-config-payload-reply-to.js';

/**
 * Zod schema for the SendgridConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sendgridConfigPayload = z.lazy(() => {
  return z.object({
    apiKey: z.string(),
    from: sendgridConfigPayloadFrom.optional(),
    replyTo: sendgridConfigPayloadReplyTo.optional(),
  });
});

/**
 *
 * @typedef  {SendgridConfigPayload} sendgridConfigPayload
 * @property {string} - The API key for Sendgrid
 * @property {SendgridConfigPayloadFrom}
 * @property {SendgridConfigPayloadReplyTo}
 */
export type SendgridConfigPayload = z.infer<typeof sendgridConfigPayload>;

/**
 * Zod schema for mapping API responses to the SendgridConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      api_key: z.string(),
      from: sendgridConfigPayloadFromResponse.optional(),
      reply_to: sendgridConfigPayloadReplyToResponse.optional(),
    })
    .transform((data) => ({
      apiKey: data['api_key'],
      from: data['from'],
      replyTo: data['reply_to'],
    }));
});

/**
 * Zod schema for mapping the SendgridConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      apiKey: z.string(),
      from: sendgridConfigPayloadFromRequest.optional(),
      replyTo: sendgridConfigPayloadReplyToRequest.optional(),
    })
    .transform((data) => ({
      api_key: data['apiKey'],
      from: data['from'],
      reply_to: data['replyTo'],
    }));
});
