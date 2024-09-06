import { z } from 'zod';

import { broadcast, broadcastRequest, broadcastResponse } from './broadcast';
import { links, linksRequest, linksResponse } from './links';

/**
 * The shape of the model inside the application code - what the users use
 */
export const broadcastListResponse = z.lazy(() => {
  return z.object({
    links: links,
    data: z.array(broadcast),
  });
});

/**
 *
 * @typedef  {BroadcastListResponse} broadcastListResponse
 * @property {Links}
 * @property {Broadcast[]}
 */
export type BroadcastListResponse = z.infer<typeof broadcastListResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastListResponseResponse = z.lazy(() => {
  return z
    .object({
      links: linksResponse,
      data: z.array(broadcastResponse),
    })
    .transform((data) => ({
      links: data['links'],
      data: data['data'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastListResponseRequest = z.lazy(() => {
  return z.object({ links: linksRequest.nullish(), data: z.array(broadcastRequest).nullish() }).transform((data) => ({
    links: data['links'],
    data: data['data'],
  }));
});
