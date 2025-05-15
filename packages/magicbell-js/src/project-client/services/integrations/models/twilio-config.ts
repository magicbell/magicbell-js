import { z } from 'zod';

import {
  TwilioConfigPayload,
  twilioConfigPayload,
  twilioConfigPayloadRequest,
  twilioConfigPayloadResponse,
} from './twilio-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const twilioConfig = z.lazy(() => {
  return z.object({
    config: twilioConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {TwilioConfig} twilioConfig
 * @property {TwilioConfigPayload}
 * @property {string}
 * @property {string}
 */
export type TwilioConfig = z.infer<typeof twilioConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const twilioConfigResponse = z.lazy(() => {
  return z
    .object({
      config: twilioConfigPayloadResponse,
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
export const twilioConfigRequest = z.lazy(() => {
  return z
    .object({
      config: twilioConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
