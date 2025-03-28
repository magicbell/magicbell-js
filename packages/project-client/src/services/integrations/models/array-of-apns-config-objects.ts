import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { apnsConfigObject, apnsConfigObjectRequest, apnsConfigObjectResponse } from './apns-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfApnsConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(apnsConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfApnsConfigObjects} arrayOfApnsConfigObjects
 * @property {ApnsConfigObject[]}
 * @property {Links}
 */
export type ArrayOfApnsConfigObjects = z.infer<typeof arrayOfApnsConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfApnsConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsConfigObjectResponse).optional(),
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
export const arrayOfApnsConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(apnsConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
