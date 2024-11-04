import { z } from 'zod';

import { sesConfig, sesConfigRequest, sesConfigResponse } from './ses-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfigObject = z.lazy(() => {
  return z.object({
    config: sesConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SesConfigObject} sesConfigObject
 * @property {SesConfig}
 * @property {string}
 * @property {string}
 */
export type SesConfigObject = z.infer<typeof sesConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: sesConfigResponse,
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
export const sesConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: sesConfigRequest.nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
