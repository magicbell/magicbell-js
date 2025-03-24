import { z } from 'zod';

import { apnsConfig, apnsConfigRequest, apnsConfigResponse } from './apns-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsConfigObject = z.lazy(() => {
  return z.object({
    config: apnsConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ApnsConfigObject} apnsConfigObject
 * @property {ApnsConfig}
 * @property {string}
 * @property {string}
 */
export type ApnsConfigObject = z.infer<typeof apnsConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: apnsConfigResponse,
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
export const apnsConfigObjectRequest = z.lazy(() => {
  return z.object({ config: apnsConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
