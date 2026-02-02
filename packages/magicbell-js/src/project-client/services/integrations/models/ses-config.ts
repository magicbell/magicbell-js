import { z } from 'zod';

import {
  SesConfigPayload,
  sesConfigPayload,
  sesConfigPayloadRequest,
  sesConfigPayloadResponse,
} from './ses-config-payload.js';

/**
 * Zod schema for the SesConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sesConfig = z.lazy(() => {
  return z.object({
    config: sesConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SesConfig} sesConfig
 * @property {SesConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SesConfig = z.infer<typeof sesConfig>;

/**
 * Zod schema for mapping API responses to the SesConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigResponse = z.lazy(() => {
  return z
    .object({
      config: sesConfigPayloadResponse,
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
 * Zod schema for mapping the SesConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sesConfigRequest = z.lazy(() => {
  return z
    .object({
      config: sesConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
