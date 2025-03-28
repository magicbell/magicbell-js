import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { pingConfigObject, pingConfigObjectRequest, pingConfigObjectResponse } from './ping-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfPingConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(pingConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfPingConfigObjects} arrayOfPingConfigObjects
 * @property {PingConfigObject[]}
 * @property {Links}
 */
export type ArrayOfPingConfigObjects = z.infer<typeof arrayOfPingConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfPingConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(pingConfigObjectResponse).optional(),
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
export const arrayOfPingConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(pingConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
