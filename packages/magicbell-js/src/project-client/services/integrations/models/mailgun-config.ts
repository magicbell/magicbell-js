import { z } from 'zod';

import {
  MailgunConfigPayload,
  mailgunConfigPayload,
  mailgunConfigPayloadRequest,
  mailgunConfigPayloadResponse,
} from './mailgun-config-payload.js';

/**
 * Zod schema for the MailgunConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the MailgunConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the MailgunConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
