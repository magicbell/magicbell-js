import { z } from 'zod';

import {
  SlackConfigPayload,
  slackConfigPayload,
  slackConfigPayloadRequest,
  slackConfigPayloadResponse,
} from './slack-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackConfig = z.lazy(() => {
  return z.object({
    config: slackConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SlackConfig} slackConfig
 * @property {SlackConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SlackConfig = z.infer<typeof slackConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigResponse = z.lazy(() => {
  return z
    .object({
      config: slackConfigPayloadResponse,
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
export const slackConfigRequest = z.lazy(() => {
  return z
    .object({
      config: slackConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
