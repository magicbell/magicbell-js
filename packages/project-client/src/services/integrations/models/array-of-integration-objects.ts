import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { integrationObject, integrationObjectRequest, integrationObjectResponse } from './integration-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfIntegrationObjects = z.lazy(() => {
  return z.object({
    data: z.array(integrationObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfIntegrationObjects} arrayOfIntegrationObjects
 * @property {IntegrationObject[]}
 * @property {Links}
 */
export type ArrayOfIntegrationObjects = z.infer<typeof arrayOfIntegrationObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfIntegrationObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(integrationObjectResponse).optional(),
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
export const arrayOfIntegrationObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(integrationObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
