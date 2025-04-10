import { z } from 'zod';

import {
  AwssnsConfigPayload,
  awssnsConfigPayload,
  awssnsConfigPayloadRequest,
  awssnsConfigPayloadResponse,
} from './awssns-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const awssnsConfig = z.lazy(() => {
  return z.object({
    config: awssnsConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {AwssnsConfig} awssnsConfig
 * @property {AwssnsConfigPayload}
 * @property {string}
 * @property {string}
 */
export type AwssnsConfig = z.infer<typeof awssnsConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigResponse = z.lazy(() => {
  return z
    .object({
      config: awssnsConfigPayloadResponse,
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
export const awssnsConfigRequest = z.lazy(() => {
  return z
    .object({
      config: awssnsConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
