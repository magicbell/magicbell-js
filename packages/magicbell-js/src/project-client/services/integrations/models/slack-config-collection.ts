import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackConfig, slackConfig, slackConfigRequest, slackConfigResponse } from './slack-config.js';

/**
 * Zod schema for the SlackConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SlackConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
