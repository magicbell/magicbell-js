import { z } from 'zod';

import {
  MailgunConfigPayload,
  mailgunConfigPayload,
  mailgunConfigPayloadRequest,
  mailgunConfigPayloadResponse,
} from './mailgun-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mailgunConfig = z.lazy(() => {
  return z.object({
    config: mailgunConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {MailgunConfig} mailgunConfig
 * @property {MailgunConfigPayload}
 * @property {string}
 * @property {string}
 */
export type MailgunConfig = z.infer<typeof mailgunConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigResponse = z.lazy(() => {
  return z
    .object({
      config: mailgunConfigPayloadResponse,
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
export const mailgunConfigRequest = z.lazy(() => {
  return z
    .object({
      config: mailgunConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
