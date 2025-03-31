import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { AwssnsConfig, awssnsConfig, awssnsConfigRequest, awssnsConfigResponse } from './awssns-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const awssnsConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(awssnsConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {AwssnsConfigCollection} awssnsConfigCollection
 * @property {AwssnsConfig[]}
 * @property {Links}
 */
export type AwssnsConfigCollection = z.infer<typeof awssnsConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const awssnsConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(awssnsConfigResponse).optional(),
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
export const awssnsConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(awssnsConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
