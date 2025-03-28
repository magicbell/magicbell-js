import { z } from 'zod';

import { fcmConfig, fcmConfigRequest, fcmConfigResponse } from './fcm-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmConfigObject = z.lazy(() => {
  return z.object({
    config: fcmConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {FcmConfigObject} fcmConfigObject
 * @property {FcmConfig}
 * @property {string}
 * @property {string}
 */
export type FcmConfigObject = z.infer<typeof fcmConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: fcmConfigResponse,
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
export const fcmConfigObjectRequest = z.lazy(() => {
  return z.object({ config: fcmConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
