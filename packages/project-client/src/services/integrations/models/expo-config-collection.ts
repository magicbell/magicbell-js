import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ExpoConfig, expoConfig, expoConfigRequest, expoConfigResponse } from './expo-config.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
