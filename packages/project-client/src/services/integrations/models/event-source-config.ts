import { z } from 'zod';

import {
  EventSourceConfigPayload,
  eventSourceConfigPayload,
  eventSourceConfigPayloadRequest,
  eventSourceConfigPayloadResponse,
} from './event-source-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
