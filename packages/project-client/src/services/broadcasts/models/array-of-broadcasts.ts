import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { broadcast, broadcastRequest, broadcastResponse } from './broadcast.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfBroadcasts = z.lazy(() => {
  return z.object({
    data: z.array(broadcast).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfBroadcasts} arrayOfBroadcasts
 * @property {Broadcast[]}
 * @property {Links}
 */
export type ArrayOfBroadcasts = z.infer<typeof arrayOfBroadcasts>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfBroadcastsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(broadcastResponse).optional(),
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
export const arrayOfBroadcastsRequest = z.lazy(() => {
  return z.object({ data: z.array(broadcastRequest).nullish(), links: linksRequest.nullish() }).transform((data) => ({
    data: data['data'],
    links: data['links'],
  }));
});
