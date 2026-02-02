import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ApnsToken, apnsToken, apnsTokenRequest, apnsTokenResponse } from './apns-token.js';

/**
 * Zod schema for the ApnsTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const apnsTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(apnsToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ApnsTokenCollection} apnsTokenCollection
 * @property {ApnsToken[]}
 * @property {Links}
 */
export type ApnsTokenCollection = z.infer<typeof apnsTokenCollection>;

/**
 * Zod schema for mapping API responses to the ApnsTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the ApnsTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const apnsTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
