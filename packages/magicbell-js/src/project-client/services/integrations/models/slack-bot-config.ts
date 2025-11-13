import { z } from 'zod';

import {
  SlackBotConfigPayload,
  slackBotConfigPayload,
  slackBotConfigPayloadRequest,
  slackBotConfigPayloadResponse,
} from './slack-bot-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackBotConfig = z.lazy(() => {
  return z.object({
    config: slackBotConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {SlackBotConfig} slackBotConfig
 * @property {SlackBotConfigPayload}
 * @property {string}
 * @property {string}
 */
export type SlackBotConfig = z.infer<typeof slackBotConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackBotConfigResponse = z.lazy(() => {
  return z
    .object({
      config: slackBotConfigPayloadResponse,
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
export const slackBotConfigRequest = z.lazy(() => {
  return z
    .object({
      config: slackBotConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
