import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { event, eventRequest, eventResponse } from './event.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfEvents = z.lazy(() => {
  return z.object({
    data: z.array(event).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfEvents} arrayOfEvents
 * @property {Event[]}
 * @property {Links}
 */
export type ArrayOfEvents = z.infer<typeof arrayOfEvents>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfEventsResponse = z.lazy(() => {
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
export const arrayOfEventsRequest = z.lazy(() => {
  return z.object({ data: z.array(eventRequest).nullish(), links: linksRequest.nullish() }).transform((data) => ({
    data: data['data'],
    links: data['links'],
  }));
});
