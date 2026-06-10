import { z } from 'zod';

import {
  GithubConfigPayload,
  githubConfigPayload,
  githubConfigPayloadRequest,
  githubConfigPayloadResponse,
} from './github-config-payload.js';

/**
 * Zod schema for the GithubConfig model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the GithubConfig application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the GithubConfig application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
