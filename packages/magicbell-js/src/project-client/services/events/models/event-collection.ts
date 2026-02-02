import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Event, event, eventRequest, eventResponse } from './event.js';

/**
 * Zod schema for the EventCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const eventCollection = z.lazy(() => {
  return z.object({
    data: z.array(event).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {EventCollection} eventCollection
 * @property {Event[]}
 * @property {Links}
 */
export type EventCollection = z.infer<typeof eventCollection>;

/**
 * Zod schema for mapping API responses to the EventCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(eventResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the EventCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const eventCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(eventRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
