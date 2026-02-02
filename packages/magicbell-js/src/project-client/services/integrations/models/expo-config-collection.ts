import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ExpoConfig, expoConfig, expoConfigRequest, expoConfigResponse } from './expo-config.js';

/**
 * Zod schema for the ExpoConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const expoConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(expoConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ExpoConfigCollection} expoConfigCollection
 * @property {ExpoConfig[]}
 * @property {Links}
 */
export type ExpoConfigCollection = z.infer<typeof expoConfigCollection>;

/**
 * Zod schema for mapping API responses to the ExpoConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoConfigResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the ExpoConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(expoConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
