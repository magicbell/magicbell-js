import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { FcmConfig, fcmConfig, fcmConfigRequest, fcmConfigResponse } from './fcm-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(fcmConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {FcmConfigCollection} fcmConfigCollection
 * @property {FcmConfig[]}
 * @property {Links}
 */
export type FcmConfigCollection = z.infer<typeof fcmConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmConfigResponse).optional(),
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
export const fcmConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
