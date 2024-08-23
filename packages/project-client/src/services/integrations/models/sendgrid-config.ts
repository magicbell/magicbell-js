import { z } from 'zod';

import { replyTo, replyToRequest, replyToResponse } from './reply-to';
import { sendgridConfigFrom, sendgridConfigFromRequest, sendgridConfigFromResponse } from './sendgrid-config-from';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sendgridConfig = z.lazy(() => {
  return z.object({
    apiKey: z.string(),
    from: sendgridConfigFrom.optional(),
    replyTo: replyTo.optional(),
  });
});

/**
 *
 * @typedef  {SendgridConfig} sendgridConfig
 * @property {string} - The API key for Sendgrid
 * @property {SendgridConfigFrom}
 * @property {ReplyTo}
 */
export type SendgridConfig = z.infer<typeof sendgridConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sendgridConfigResponse = z.lazy(() => {
  return z
    .object({
      api_key: z.string(),
      from: sendgridConfigFromResponse.optional(),
      reply_to: replyToResponse.optional(),
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
export const sendgridConfigRequest = z.lazy(() => {
  return z
    .object({
      apiKey: z.string().nullish(),
      from: sendgridConfigFromRequest.nullish(),
      replyTo: replyToRequest.nullish(),
    })
    .transform((data) => ({
      api_key: data['apiKey'],
      from: data['from'],
      reply_to: data['replyTo'],
    }));
});
