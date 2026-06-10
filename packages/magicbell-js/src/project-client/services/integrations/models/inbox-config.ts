import { z } from 'zod';

import {
  InboxConfigPayload,
  inboxConfigPayload,
  inboxConfigPayloadRequest,
  inboxConfigPayloadResponse,
} from './inbox-config-payload.js';

/**
 * Zod schema for the InboxConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const inboxConfig = z.lazy(() => {
  return z.object({
    config: inboxConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {InboxConfig} inboxConfig
 * @property {InboxConfigPayload}
 * @property {string}
 * @property {string}
 */
export type InboxConfig = z.infer<typeof inboxConfig>;

/**
 * Zod schema for mapping API responses to the InboxConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxConfigResponse = z.lazy(() => {
  return z
    .object({
      config: inboxConfigPayloadResponse,
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
 * Zod schema for mapping the InboxConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const inboxConfigRequest = z.lazy(() => {
  return z
    .object({
      config: inboxConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
