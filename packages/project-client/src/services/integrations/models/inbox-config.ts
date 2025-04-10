import { z } from 'zod';

import {
  InboxConfigPayload,
  inboxConfigPayload,
  inboxConfigPayloadRequest,
  inboxConfigPayloadResponse,
} from './inbox-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
