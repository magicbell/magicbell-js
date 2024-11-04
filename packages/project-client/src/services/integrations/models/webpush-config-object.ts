import { z } from 'zod';

import { webpushConfig, webpushConfigRequest, webpushConfigResponse } from './webpush-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webpushConfigObject = z.lazy(() => {
  return z.object({
    config: webpushConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {WebpushConfigObject} webpushConfigObject
 * @property {WebpushConfig}
 * @property {string}
 * @property {string}
 */
export type WebpushConfigObject = z.infer<typeof webpushConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webpushConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: webpushConfigResponse,
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
export const webpushConfigObjectRequest = z.lazy(() => {
  return z
    .object({ config: webpushConfigRequest.nullish(), id: z.string().nullish(), name: z.string().nullish() })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
