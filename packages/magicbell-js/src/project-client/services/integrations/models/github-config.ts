import { z } from 'zod';

import {
  GithubConfigPayload,
  githubConfigPayload,
  githubConfigPayloadRequest,
  githubConfigPayloadResponse,
} from './github-config-payload.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const githubConfig = z.lazy(() => {
  return z.object({
    config: githubConfigPayload,
    id: z.string(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {GithubConfig} githubConfig
 * @property {GithubConfigPayload}
 * @property {string}
 * @property {string}
 */
export type GithubConfig = z.infer<typeof githubConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigResponse = z.lazy(() => {
  return z
    .object({
      config: githubConfigPayloadResponse,
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
export const githubConfigRequest = z.lazy(() => {
  return z
    .object({
      config: githubConfigPayloadRequest,
      id: z.string(),
      name: z.string(),
    })
    .transform((data) => ({
      config: data['config'],
      id: data['id'],
      name: data['name'],
    }));
});
