import { z } from 'zod';

import {
  SlackConfigPayload,
  slackConfigPayload,
  slackConfigPayloadRequest,
  slackConfigPayloadResponse,
} from './slack-config-payload.js';

/**
 * Zod schema for the SlackConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SlackConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
