import { z } from 'zod';

import {
  MailgunConfigPayloadFrom,
  mailgunConfigPayloadFrom,
  mailgunConfigPayloadFromRequest,
  mailgunConfigPayloadFromResponse,
} from './mailgun-config-payload-from.js';

/**
 * Zod schema for the MailgunConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the MailgunConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the MailgunConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
