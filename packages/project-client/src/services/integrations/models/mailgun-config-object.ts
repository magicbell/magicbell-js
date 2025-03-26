import { z } from 'zod';

import { mailgunConfig, mailgunConfigRequest, mailgunConfigResponse } from './mailgun-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mailgunConfigObject = z.lazy(() => {
  return z.object({
    config: mailgunConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {MailgunConfigObject} mailgunConfigObject
 * @property {MailgunConfig}
 * @property {string}
 * @property {string}
 */
export type MailgunConfigObject = z.infer<typeof mailgunConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: mailgunConfigResponse,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigObjectRequest = z.lazy(() => {
  return z.object({ config: mailgunConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
