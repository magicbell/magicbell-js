import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  IntegrationConfig,
  integrationConfig,
  integrationConfigRequest,
  integrationConfigResponse,
} from './integration-config.js';

/**
 * Zod schema for the IntegrationConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the IntegrationConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the IntegrationConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
