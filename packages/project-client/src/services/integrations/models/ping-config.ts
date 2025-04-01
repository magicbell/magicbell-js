import { z } from 'zod';

import {
  PingConfigPayload,
  pingConfigPayload,
  pingConfigPayloadRequest,
  pingConfigPayloadResponse,
} from './ping-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
