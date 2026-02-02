import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  EventSourceConfig,
  eventSourceConfig,
  eventSourceConfigRequest,
  eventSourceConfigResponse,
} from './event-source-config.js';

/**
 * Zod schema for the EventSourceConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the EventSourceConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the EventSourceConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
