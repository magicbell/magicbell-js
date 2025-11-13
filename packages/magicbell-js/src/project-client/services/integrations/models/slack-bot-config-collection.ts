import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackBotConfig, slackBotConfig, slackBotConfigRequest, slackBotConfigResponse } from './slack-bot-config.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
