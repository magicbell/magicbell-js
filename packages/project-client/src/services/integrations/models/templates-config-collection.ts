import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  TemplatesConfig,
  templatesConfig,
  templatesConfigRequest,
  templatesConfigResponse,
} from './templates-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const templatesConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(templatesConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {TemplatesConfigCollection} templatesConfigCollection
 * @property {TemplatesConfig[]}
 * @property {Links}
 */
export type TemplatesConfigCollection = z.infer<typeof templatesConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const templatesConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(templatesConfigResponse).optional(),
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
export const templatesConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(templatesConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
