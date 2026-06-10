import { z } from 'zod';

import {
  TwilioConfigPayload,
  twilioConfigPayload,
  twilioConfigPayloadRequest,
  twilioConfigPayloadResponse,
} from './twilio-config-payload.js';

/**
 * Zod schema for the TwilioConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the TwilioConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the TwilioConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
