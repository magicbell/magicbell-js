import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  IntegrationConfig,
  integrationConfig,
  integrationConfigRequest,
  integrationConfigResponse,
} from './integration-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const integrationConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(integrationConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {IntegrationConfigCollection} integrationConfigCollection
 * @property {IntegrationConfig[]}
 * @property {Links}
 */
export type IntegrationConfigCollection = z.infer<typeof integrationConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const integrationConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(integrationConfigResponse).optional(),
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
export const integrationConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(integrationConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
