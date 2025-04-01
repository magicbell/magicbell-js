import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackConfig, slackConfig, slackConfigRequest, slackConfigResponse } from './slack-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(slackConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SlackConfigCollection} slackConfigCollection
 * @property {SlackConfig[]}
 * @property {Links}
 */
export type SlackConfigCollection = z.infer<typeof slackConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackConfigResponse).optional(),
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
export const slackConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(slackConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
