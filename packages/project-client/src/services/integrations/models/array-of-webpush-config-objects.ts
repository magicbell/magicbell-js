import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  webpushConfigObject,
  webpushConfigObjectRequest,
  webpushConfigObjectResponse,
} from './webpush-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfWebpushConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(webpushConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfWebpushConfigObjects} arrayOfWebpushConfigObjects
 * @property {WebpushConfigObject[]}
 * @property {Links}
 */
export type ArrayOfWebpushConfigObjects = z.infer<typeof arrayOfWebpushConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfWebpushConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(webpushConfigObjectResponse).optional(),
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
export const arrayOfWebpushConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(webpushConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
