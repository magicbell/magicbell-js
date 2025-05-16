import { z } from 'zod';

import {
  SendgridConfigPayload,
  sendgridConfigPayload,
  sendgridConfigPayloadRequest,
  sendgridConfigPayloadResponse,
} from './sendgrid-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sendgridConfig = z.lazy(() => {
  return z.object({
    config: sendgridConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SendgridConfig} sendgridConfig
 * @property {SendgridConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SendgridConfig = z.infer<typeof sendgridConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sendgridConfigResponse = z.lazy(() => {
  return z
    .object({
      config: sendgridConfigPayloadResponse,
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
export const sendgridConfigRequest = z.lazy(() => {
  return z
    .object({
      config: sendgridConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
