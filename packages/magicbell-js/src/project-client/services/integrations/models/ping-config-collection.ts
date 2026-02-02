import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { PingConfig, pingConfig, pingConfigRequest, pingConfigResponse } from './ping-config.js';

/**
 * Zod schema for the PingConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the PingConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the PingConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
