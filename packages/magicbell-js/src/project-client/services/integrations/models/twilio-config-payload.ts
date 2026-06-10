import { z } from 'zod';

/**
 * Zod schema for the TwilioConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const twilioConfigPayload = z.lazy(() => {
  return z.object({
    accountSid: z.string().min(1).max(100),
    apiKey: z.string().min(1).max(100),
    apiSecret: z.string().min(1).max(100),
    from: z
      .string()
      .min(1)
      .max(100)
      .regex(/^\+[0-9]{1,14}$/),
  });
});

/**
 *
 * @typedef  {TwilioConfigPayload} twilioConfigPayload
 * @property {string} - The SID for your Twilio account
 * @property {string} - A US1 API key for Twilio-  - https://www.twilio.com/docs/iam/api-keys
 * @property {string} - The API Secret for Twilio
 * @property {string} - The phone number to send from, in E.164 format
 */
export type TwilioConfigPayload = z.infer<typeof twilioConfigPayload>;

/**
 * Zod schema for mapping API responses to the TwilioConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const twilioConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      account_sid: z.string().min(1).max(100),
      api_key: z.string().min(1).max(100),
      api_secret: z.string().min(1).max(100),
      from: z
        .string()
        .min(1)
        .max(100)
        .regex(/^\+[0-9]{1,14}$/),
    })
    .transform((data) => ({
      accountSid: data['account_sid'],
      apiKey: data['api_key'],
      apiSecret: data['api_secret'],
      from: data['from'],
    }));
});

/**
 * Zod schema for mapping the TwilioConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const twilioConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      accountSid: z.string().min(1).max(100),
      apiKey: z.string().min(1).max(100),
      apiSecret: z.string().min(1).max(100),
      from: z
        .string()
        .min(1)
        .max(100)
        .regex(/^\+[0-9]{1,14}$/),
    })
    .transform((data) => ({
      account_sid: data['accountSid'],
      api_key: data['apiKey'],
      api_secret: data['apiSecret'],
      from: data['from'],
    }));
});
