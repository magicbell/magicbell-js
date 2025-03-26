import { z } from 'zod';

import { githubConfig, githubConfigRequest, githubConfigResponse } from './github-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const githubConfigObject = z.lazy(() => {
  return z.object({
    config: githubConfig,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {GithubConfigObject} githubConfigObject
 * @property {GithubConfig}
 * @property {string}
 * @property {string}
 */
export type GithubConfigObject = z.infer<typeof githubConfigObject>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigObjectResponse = z.lazy(() => {
  return z
    .object({
      config: githubConfigResponse,
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigObjectRequest = z.lazy(() => {
  return z.object({ config: githubConfigRequest, id: z.string(), name: z.string() }).transform((data) => ({
    config: data['config'],
    id: data['id'],
    name: data['name'],
  }));
});
