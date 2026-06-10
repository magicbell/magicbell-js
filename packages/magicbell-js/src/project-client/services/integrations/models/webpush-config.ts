import { z } from 'zod';

import {
  WebpushConfigPayload,
  webpushConfigPayload,
  webpushConfigPayloadRequest,
  webpushConfigPayloadResponse,
} from './webpush-config-payload.js';

/**
 * Zod schema for the WebpushConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the WebpushConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the WebpushConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
