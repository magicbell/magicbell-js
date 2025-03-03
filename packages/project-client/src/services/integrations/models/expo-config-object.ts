import { z } from 'zod';

import { expoConfig, expoConfigRequest, expoConfigResponse } from './expo-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const expoConfigObject = z.lazy(() => {
  return z.object({
    config: expoConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ExpoConfigObject} expoConfigObject
 * @property {ExpoConfig}
 * @property {string}
 * @property {string}
 */
export type ExpoConfigObject = z.infer<typeof expoConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const expoConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: expoConfigResponse,
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
export const expoConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: expoConfigRequest.nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
