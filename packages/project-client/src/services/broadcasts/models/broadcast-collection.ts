import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Broadcast, broadcast, broadcastRequest, broadcastResponse } from './broadcast.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const broadcastCollection = z.lazy(() => {
  return z.object({
    data: z.array(broadcast).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {BroadcastCollection} broadcastCollection
 * @property {Broadcast[]}
 * @property {Links}
 */
export type BroadcastCollection = z.infer<typeof broadcastCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastCollectionResponse = z.lazy(() => {
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
export const broadcastCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(broadcastRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
