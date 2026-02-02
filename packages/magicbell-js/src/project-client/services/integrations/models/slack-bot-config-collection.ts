import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackBotConfig, slackBotConfig, slackBotConfigRequest, slackBotConfigResponse } from './slack-bot-config.js';

/**
 * Zod schema for the SlackBotConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackBotConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(slackBotConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SlackBotConfigCollection} slackBotConfigCollection
 * @property {SlackBotConfig[]}
 * @property {Links}
 */
export type SlackBotConfigCollection = z.infer<typeof slackBotConfigCollection>;

/**
 * Zod schema for mapping API responses to the SlackBotConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackBotConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackBotConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the SlackBotConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackBotConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(slackBotConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
