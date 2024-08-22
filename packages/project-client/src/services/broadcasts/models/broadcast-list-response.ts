import { z } from 'zod';

import { broadcast, broadcastRequest, broadcastResponse } from './broadcast';

/**
 * The shape of the model inside the application code - what the users use
 */
export const broadcastListResponse = z.lazy(() => {
  return z.object({
    currentPage: z.number(),
    perPage: z.number(),
    broadcasts: z.array(broadcast),
  });
});

/**
 *
 * @typedef  {BroadcastListResponse} broadcastListResponse
 * @property {number} - Number of the page returned.
 * @property {number} - Number of entities per page.
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
      current_page: z.number(),
      per_page: z.number(),
      broadcasts: z.array(broadcastResponse),
    })
    .transform((data) => ({
      currentPage: data['current_page'],
      perPage: data['per_page'],
      broadcasts: data['broadcasts'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const broadcastListResponseRequest = z.lazy(() => {
  return z
    .object({
      currentPage: z.number().nullish(),
      perPage: z.number().nullish(),
      broadcasts: z.array(broadcastRequest).nullish(),
    })
    .transform((data) => ({
      current_page: data['currentPage'],
      per_page: data['perPage'],
      broadcasts: data['broadcasts'],
    }));
});
