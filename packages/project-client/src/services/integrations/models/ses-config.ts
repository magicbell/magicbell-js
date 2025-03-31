import { z } from 'zod';

import {
  SesConfigPayload,
  sesConfigPayload,
  sesConfigPayloadRequest,
  sesConfigPayloadResponse,
} from './ses-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfig = z.lazy(() => {
  return z.object({
    config: sesConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SesConfig} sesConfig
 * @property {SesConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SesConfig = z.infer<typeof sesConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigResponse = z.lazy(() => {
  return z
    .object({
      config: sesConfigPayloadResponse,
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
export const sesConfigRequest = z.lazy(() => {
  return z
    .object({
      config: sesConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
