import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { GithubConfig, githubConfig, githubConfigRequest, githubConfigResponse } from './github-config.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
