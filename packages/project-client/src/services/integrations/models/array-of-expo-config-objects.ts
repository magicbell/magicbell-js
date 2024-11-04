import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { expoConfigObject, expoConfigObjectRequest, expoConfigObjectResponse } from './expo-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfExpoConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(expoConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfExpoConfigObjects} arrayOfExpoConfigObjects
 * @property {ExpoConfigObject[]}
 * @property {Links}
 */
export type ArrayOfExpoConfigObjects = z.infer<typeof arrayOfExpoConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfExpoConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoConfigObjectResponse).optional(),
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
export const arrayOfExpoConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(expoConfigObjectRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
