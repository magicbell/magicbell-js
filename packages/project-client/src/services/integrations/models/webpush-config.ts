import { z } from 'zod';

import {
  WebpushConfigPayload,
  webpushConfigPayload,
  webpushConfigPayloadRequest,
  webpushConfigPayloadResponse,
} from './webpush-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webpushConfig = z.lazy(() => {
  return z.object({
    config: webpushConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {WebpushConfig} webpushConfig
 * @property {WebpushConfigPayload}
 * @property {string}
 * @property {string}
 */
export type WebpushConfig = z.infer<typeof webpushConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webpushConfigResponse = z.lazy(() => {
  return z
    .object({
      config: webpushConfigPayloadResponse,
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
export const webpushConfigRequest = z.lazy(() => {
  return z
    .object({
      config: webpushConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
