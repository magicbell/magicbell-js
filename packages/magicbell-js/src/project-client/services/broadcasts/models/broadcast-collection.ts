import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Broadcast, broadcast, broadcastRequest, broadcastResponse } from './broadcast.js';

/**
 * Zod schema for the BroadcastCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the BroadcastCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the BroadcastCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
