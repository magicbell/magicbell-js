import { z } from 'zod';

import {
  ExpoConfigPayload,
  expoConfigPayload,
  expoConfigPayloadRequest,
  expoConfigPayloadResponse,
} from './expo-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoConfig = z.lazy(() => {
  return z.object({
    config: expoConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ExpoConfig} expoConfig
 * @property {ExpoConfigPayload}
 * @property {string}
 * @property {string}
 */
export type ExpoConfig = z.infer<typeof expoConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoConfigResponse = z.lazy(() => {
  return z
    .object({
      config: expoConfigPayloadResponse,
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
export const expoConfigRequest = z.lazy(() => {
  return z
    .object({
      config: expoConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
