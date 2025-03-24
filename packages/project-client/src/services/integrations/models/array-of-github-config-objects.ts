import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { githubConfigObject, githubConfigObjectRequest, githubConfigObjectResponse } from './github-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfGithubConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(githubConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfGithubConfigObjects} arrayOfGithubConfigObjects
 * @property {GithubConfigObject[]}
 * @property {Links}
 */
export type ArrayOfGithubConfigObjects = z.infer<typeof arrayOfGithubConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfGithubConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(githubConfigObjectResponse).optional(),
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
export const arrayOfGithubConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(githubConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
