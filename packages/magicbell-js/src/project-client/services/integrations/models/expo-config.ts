import { z } from 'zod';

import {
  ExpoConfigPayload,
  expoConfigPayload,
  expoConfigPayloadRequest,
  expoConfigPayloadResponse,
} from './expo-config-payload.js';

/**
 * Zod schema for the ExpoConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const expoConfig = z.lazy(() => {
  return z.object({
    config: expoConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {ExpoConfig} expoConfig
 * @property {ExpoConfigPayload}
 * @property {string}
 * @property {string}
 */
export type ExpoConfig = z.infer<typeof expoConfig>;

/**
 * Zod schema for mapping API responses to the ExpoConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigResponse = z.lazy(() => {
  return z
    .object({
      config: expoConfigPayloadResponse,
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
 * Zod schema for mapping the ExpoConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigRequest = z.lazy(() => {
  return z
    .object({
      config: expoConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
