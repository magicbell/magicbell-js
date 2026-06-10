import { z } from 'zod';

import {
  EventSourceConfigPayload,
  eventSourceConfigPayload,
  eventSourceConfigPayloadRequest,
  eventSourceConfigPayloadResponse,
} from './event-source-config-payload.js';

/**
 * Zod schema for the EventSourceConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const eventSourceConfig = z.lazy(() => {
  return z.object({
    config: eventSourceConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {EventSourceConfig} eventSourceConfig
 * @property {EventSourceConfigPayload}
 * @property {string}
 * @property {string}
 */
export type EventSourceConfig = z.infer<typeof eventSourceConfig>;

/**
 * Zod schema for mapping API responses to the EventSourceConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventSourceConfigResponse = z.lazy(() => {
  return z
    .object({
      config: eventSourceConfigPayloadResponse,
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
 * Zod schema for mapping the EventSourceConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventSourceConfigRequest = z.lazy(() => {
  return z
    .object({
      config: eventSourceConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
