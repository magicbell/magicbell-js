import { z } from 'zod';

import {
  MailgunConfigPayloadFrom,
  mailgunConfigPayloadFrom,
  mailgunConfigPayloadFromRequest,
  mailgunConfigPayloadFromResponse,
} from './mailgun-config-payload-from.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mailgunConfigPayload = z.lazy(() => {
  return z.object({
    apiKey: z.string().min(1),
    domain: z.string().min(1),
    from: mailgunConfigPayloadFrom.optional(),
    region: z.string(),
  });
});

/**
 *
 * @typedef  {MailgunConfigPayload} mailgunConfigPayload
 * @property {string}
 * @property {string}
 * @property {MailgunConfigPayloadFrom}
 * @property {Region}
 */
export type MailgunConfigPayload = z.infer<typeof mailgunConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      api_key: z.string().min(1),
      domain: z.string().min(1),
      from: mailgunConfigPayloadFromResponse.optional(),
      region: z.string(),
    })
    .transform((data) => ({
      apiKey: data['api_key'],
      domain: data['domain'],
      from: data['from'],
      region: data['region'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      apiKey: z.string().min(1),
      domain: z.string().min(1),
      from: mailgunConfigPayloadFromRequest.optional(),
      region: z.string(),
    })
    .transform((data) => ({
      api_key: data['apiKey'],
      domain: data['domain'],
      from: data['from'],
      region: data['region'],
    }));
});
