import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const twilioConfig = z.lazy(() => {
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
 * @typedef  {TwilioConfig} twilioConfig
 * @property {string} - The SID for your Twilio account
 * @property {string} - A US1 API key for Twilio-  - https://www.twilio.com/docs/iam/api-keys
 * @property {string} - The API Secret for Twilio
 * @property {string} - The phone number to send from, in E.164 format
 */
export type TwilioConfig = z.infer<typeof twilioConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const twilioConfigResponse = z.lazy(() => {
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const twilioConfigRequest = z.lazy(() => {
  return z
    .object({ accountSid: z.string(), apiKey: z.string(), apiSecret: z.string(), from: z.string() })
    .transform((data) => ({
      account_sid: data['accountSid'],
      api_key: data['apiKey'],
      api_secret: data['apiSecret'],
      from: data['from'],
    }));
});
