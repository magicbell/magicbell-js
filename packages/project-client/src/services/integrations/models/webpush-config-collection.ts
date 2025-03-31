import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { WebpushConfig, webpushConfig, webpushConfigRequest, webpushConfigResponse } from './webpush-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const webpushConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(webpushConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {WebpushConfigCollection} webpushConfigCollection
 * @property {WebpushConfig[]}
 * @property {Links}
 */
export type WebpushConfigCollection = z.infer<typeof webpushConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const webpushConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(webpushConfigResponse).optional(),
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
export const webpushConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(webpushConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
