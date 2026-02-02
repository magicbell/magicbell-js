import { z } from 'zod';

import {
  FcmConfigPayload,
  fcmConfigPayload,
  fcmConfigPayloadRequest,
  fcmConfigPayloadResponse,
} from './fcm-config-payload.js';

/**
 * Zod schema for the FcmConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const fcmConfig = z.lazy(() => {
  return z.object({
    config: fcmConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {FcmConfig} fcmConfig
 * @property {FcmConfigPayload}
 * @property {string}
 * @property {string}
 */
export type FcmConfig = z.infer<typeof fcmConfig>;

/**
 * Zod schema for mapping API responses to the FcmConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmConfigResponse = z.lazy(() => {
  return z
    .object({
      config: fcmConfigPayloadResponse,
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
 * Zod schema for mapping the FcmConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmConfigRequest = z.lazy(() => {
  return z
    .object({
      config: fcmConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
