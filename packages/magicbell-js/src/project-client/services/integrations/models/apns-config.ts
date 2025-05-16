import { z } from 'zod';

import {
  ApnsConfigPayload,
  apnsConfigPayload,
  apnsConfigPayloadRequest,
  apnsConfigPayloadResponse,
} from './apns-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsConfig = z.lazy(() => {
  return z.object({
    config: apnsConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ApnsConfig} apnsConfig
 * @property {ApnsConfigPayload}
 * @property {string}
 * @property {string}
 */
export type ApnsConfig = z.infer<typeof apnsConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsConfigResponse = z.lazy(() => {
  return z
    .object({
      config: apnsConfigPayloadResponse,
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
export const apnsConfigRequest = z.lazy(() => {
  return z
    .object({
      config: apnsConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
