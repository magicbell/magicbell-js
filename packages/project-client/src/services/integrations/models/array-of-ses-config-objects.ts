import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { sesConfigObject, sesConfigObjectRequest, sesConfigObjectResponse } from './ses-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfSesConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(sesConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfSesConfigObjects} arrayOfSesConfigObjects
 * @property {SesConfigObject[]}
 * @property {Links}
 */
export type ArrayOfSesConfigObjects = z.infer<typeof arrayOfSesConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfSesConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(sesConfigObjectResponse).optional(),
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
export const arrayOfSesConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(sesConfigObjectRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
