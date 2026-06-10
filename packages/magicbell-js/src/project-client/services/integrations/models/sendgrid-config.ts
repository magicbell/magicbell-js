import { z } from 'zod';

import {
  SendgridConfigPayload,
  sendgridConfigPayload,
  sendgridConfigPayloadRequest,
  sendgridConfigPayloadResponse,
} from './sendgrid-config-payload.js';

/**
 * Zod schema for the SendgridConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const sendgridConfig = z.lazy(() => {
  return z.object({
    config: sendgridConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SendgridConfig} sendgridConfig
 * @property {SendgridConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SendgridConfig = z.infer<typeof sendgridConfig>;

/**
 * Zod schema for mapping API responses to the SendgridConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigResponse = z.lazy(() => {
  return z
    .object({
      config: sendgridConfigPayloadResponse,
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
 * Zod schema for mapping the SendgridConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const sendgridConfigRequest = z.lazy(() => {
  return z
    .object({
      config: sendgridConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
