import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { PingConfig, pingConfig, pingConfigRequest, pingConfigResponse } from './ping-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const pingConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(pingConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {PingConfigCollection} pingConfigCollection
 * @property {PingConfig[]}
 * @property {Links}
 */
export type PingConfigCollection = z.infer<typeof pingConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const pingConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(pingConfigResponse).optional(),
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
export const pingConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(pingConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
