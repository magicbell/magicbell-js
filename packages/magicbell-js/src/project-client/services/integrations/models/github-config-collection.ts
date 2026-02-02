import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { GithubConfig, githubConfig, githubConfigRequest, githubConfigResponse } from './github-config.js';

/**
 * Zod schema for the GithubConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const githubConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(githubConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {GithubConfigCollection} githubConfigCollection
 * @property {GithubConfig[]}
 * @property {Links}
 */
export type GithubConfigCollection = z.infer<typeof githubConfigCollection>;

/**
 * Zod schema for mapping API responses to the GithubConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const githubConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(githubConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the GithubConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const githubConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(githubConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
