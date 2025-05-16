import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ApnsConfig, apnsConfig, apnsConfigRequest, apnsConfigResponse } from './apns-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const apnsConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(apnsConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ApnsConfigCollection} apnsConfigCollection
 * @property {ApnsConfig[]}
 * @property {Links}
 */
export type ApnsConfigCollection = z.infer<typeof apnsConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const apnsConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsConfigResponse).optional(),
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
export const apnsConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
