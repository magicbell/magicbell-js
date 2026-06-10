import { z } from 'zod';

import {
  PingConfigPayload,
  pingConfigPayload,
  pingConfigPayloadRequest,
  pingConfigPayloadResponse,
} from './ping-config-payload.js';

/**
 * Zod schema for the PingConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const pingConfig = z.lazy(() => {
  return z.object({
    config: pingConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {PingConfig} pingConfig
 * @property {PingConfigPayload}
 * @property {string}
 * @property {string}
 */
export type PingConfig = z.infer<typeof pingConfig>;

/**
 * Zod schema for mapping API responses to the PingConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const pingConfigResponse = z.lazy(() => {
  return z
    .object({
      config: pingConfigPayloadResponse,
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
 * Zod schema for mapping the PingConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const pingConfigRequest = z.lazy(() => {
  return z
    .object({
      config: pingConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
