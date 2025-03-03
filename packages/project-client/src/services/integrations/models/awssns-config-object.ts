import { z } from 'zod';

import { awssnsConfig, awssnsConfigRequest, awssnsConfigResponse } from './awssns-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const awssnsConfigObject = z.lazy(() => {
  return z.object({
    config: awssnsConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {AwssnsConfigObject} awssnsConfigObject
 * @property {AwssnsConfig}
 * @property {string}
 * @property {string}
 */
export type AwssnsConfigObject = z.infer<typeof awssnsConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: awssnsConfigResponse,
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
export const awssnsConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: awssnsConfigRequest.nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
