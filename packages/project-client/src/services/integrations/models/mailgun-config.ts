import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mailgunConfig = z.lazy(() => {
  return z.object({
    apiKey: z.string().min(1),
    domain: z.string().min(1),
    region: z.string(),
  });
});

/**
 *
 * @typedef  {MailgunConfig} mailgunConfig
 * @property {string}
 * @property {string}
 * @property {Region}
 */
export type MailgunConfig = z.infer<typeof mailgunConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigResponse = z.lazy(() => {
  return z
    .object({
      api_key: z.string().min(1),
      domain: z.string().min(1),
      region: z.string(),
    })
    .transform((data) => ({
      apiKey: data['api_key'],
      domain: data['domain'],
      region: data['region'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigRequest = z.lazy(() => {
  return z.object({ apiKey: z.string(), domain: z.string(), region: z.string() }).transform((data) => ({
    api_key: data['apiKey'],
    domain: data['domain'],
    region: data['region'],
  }));
});
