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
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
