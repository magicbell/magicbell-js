import { z } from 'zod';

import { pingConfig, pingConfigRequest, pingConfigResponse } from './ping-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const pingConfigObject = z.lazy(() => {
  return z.object({
    config: pingConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {PingConfigObject} pingConfigObject
 * @property {PingConfig}
 * @property {string}
 * @property {string}
 */
export type PingConfigObject = z.infer<typeof pingConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const pingConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: pingConfigResponse,
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
export const pingConfigObjectRequest = z.lazy(() => {
  return z.object({ config: pingConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
