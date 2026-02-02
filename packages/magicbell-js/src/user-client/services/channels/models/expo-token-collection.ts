import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { ExpoToken, expoToken, expoTokenRequest, expoTokenResponse } from './expo-token.js';

/**
 * Zod schema for the ExpoTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const expoTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(expoToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ExpoTokenCollection} expoTokenCollection
 * @property {ExpoToken[]}
 * @property {Links}
 */
export type ExpoTokenCollection = z.infer<typeof expoTokenCollection>;

/**
 * Zod schema for mapping API responses to the ExpoTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the ExpoTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const expoTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
