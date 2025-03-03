import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { fcmConfigObject, fcmConfigObjectRequest, fcmConfigObjectResponse } from './fcm-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfFcmConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(fcmConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfFcmConfigObjects} arrayOfFcmConfigObjects
 * @property {FcmConfigObject[]}
 * @property {Links}
 */
export type ArrayOfFcmConfigObjects = z.infer<typeof arrayOfFcmConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfFcmConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmConfigObjectResponse).optional(),
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
export const arrayOfFcmConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(fcmConfigObjectRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
