import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SlackToken, slackToken, slackTokenRequest, slackTokenResponse } from './slack-token.js';

/**
 * Zod schema for the SlackTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(slackToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenCollection} slackTokenCollection
 * @property {SlackToken[]}
 * @property {Links}
 */
export type SlackTokenCollection = z.infer<typeof slackTokenCollection>;

/**
 * Zod schema for mapping API responses to the SlackTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the SlackTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(slackTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
