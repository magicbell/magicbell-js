import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { awssnsConfigObject, awssnsConfigObjectRequest, awssnsConfigObjectResponse } from './awssns-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfAwssnsConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(awssnsConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfAwssnsConfigObjects} arrayOfAwssnsConfigObjects
 * @property {AwssnsConfigObject[]}
 * @property {Links}
 */
export type ArrayOfAwssnsConfigObjects = z.infer<typeof arrayOfAwssnsConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfAwssnsConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(awssnsConfigObjectResponse).optional(),
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
export const arrayOfAwssnsConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(awssnsConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
