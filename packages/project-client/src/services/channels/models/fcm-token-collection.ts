import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { FcmToken, fcmToken, fcmTokenRequest, fcmTokenResponse } from './fcm-token.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
