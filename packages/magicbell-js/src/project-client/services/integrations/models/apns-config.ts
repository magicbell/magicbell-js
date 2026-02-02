import { z } from 'zod';

import {
  ApnsConfigPayload,
  apnsConfigPayload,
  apnsConfigPayloadRequest,
  apnsConfigPayloadResponse,
} from './apns-config-payload.js';

/**
 * Zod schema for the ApnsConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const apnsConfig = z.lazy(() => {
  return z.object({
    config: apnsConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ApnsConfig} apnsConfig
 * @property {ApnsConfigPayload}
 * @property {string}
 * @property {string}
 */
export type ApnsConfig = z.infer<typeof apnsConfig>;

/**
 * Zod schema for mapping API responses to the ApnsConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigResponse = z.lazy(() => {
  return z
    .object({
      config: apnsConfigPayloadResponse,
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
 * Zod schema for mapping the ApnsConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsConfigRequest = z.lazy(() => {
  return z
    .object({
      config: apnsConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
