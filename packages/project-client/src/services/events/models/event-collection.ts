import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Event, event, eventRequest, eventResponse } from './event.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
