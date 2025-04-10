import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  EventSourceConfig,
  eventSourceConfig,
  eventSourceConfigRequest,
  eventSourceConfigResponse,
} from './event-source-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const eventSourceConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(eventSourceConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {EventSourceConfigCollection} eventSourceConfigCollection
 * @property {EventSourceConfig[]}
 * @property {Links}
 */
export type EventSourceConfigCollection = z.infer<typeof eventSourceConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const eventSourceConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(eventSourceConfigResponse).optional(),
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
export const eventSourceConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(eventSourceConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
