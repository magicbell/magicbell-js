import { z } from 'zod';

import {
  FcmConfigPayload,
  fcmConfigPayload,
  fcmConfigPayloadRequest,
  fcmConfigPayloadResponse,
} from './fcm-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmConfig = z.lazy(() => {
  return z.object({
    config: fcmConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {FcmConfig} fcmConfig
 * @property {FcmConfigPayload}
 * @property {string}
 * @property {string}
 */
export type FcmConfig = z.infer<typeof fcmConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmConfigResponse = z.lazy(() => {
  return z
    .object({
      config: fcmConfigPayloadResponse,
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
export const fcmConfigRequest = z.lazy(() => {
  return z
    .object({
      config: fcmConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
