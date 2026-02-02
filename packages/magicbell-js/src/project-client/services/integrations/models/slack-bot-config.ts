import { z } from 'zod';

import {
  SlackBotConfigPayload,
  slackBotConfigPayload,
  slackBotConfigPayloadRequest,
  slackBotConfigPayloadResponse,
} from './slack-bot-config-payload.js';

/**
 * Zod schema for the SlackBotConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SlackBotConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackBotConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
