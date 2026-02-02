import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { FcmToken, fcmToken, fcmTokenRequest, fcmTokenResponse } from './fcm-token.js';

/**
 * Zod schema for the FcmTokenCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const fcmTokenCollection = z.lazy(() => {
  return z.object({
    data: z.array(fcmToken).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {FcmTokenCollection} fcmTokenCollection
 * @property {FcmToken[]}
 * @property {Links}
 */
export type FcmTokenCollection = z.infer<typeof fcmTokenCollection>;

/**
 * Zod schema for mapping API responses to the FcmTokenCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmTokenResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the FcmTokenCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const fcmTokenCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmTokenRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
