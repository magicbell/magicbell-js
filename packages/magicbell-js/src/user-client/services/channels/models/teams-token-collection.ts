import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { TeamsToken, teamsToken, teamsTokenRequest, teamsTokenResponse } from './teams-token.js';

/**
 * Zod schema for the TeamsTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const teamsTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(teamsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {TeamsTokenCollection} teamsTokenCollection
 * @property {TeamsToken[]}
 * @property {Links}
 */
export type TeamsTokenCollection = z.infer<typeof teamsTokenCollection>;

/**
 * Zod schema for mapping API responses to the TeamsTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const teamsTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(teamsTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the TeamsTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const teamsTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(teamsTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
