import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SesConfig, sesConfig, sesConfigRequest, sesConfigResponse } from './ses-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sesConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(sesConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SesConfigCollection} sesConfigCollection
 * @property {SesConfig[]}
 * @property {Links}
 */
export type SesConfigCollection = z.infer<typeof sesConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sesConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(sesConfigResponse).optional(),
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
export const sesConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(sesConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
