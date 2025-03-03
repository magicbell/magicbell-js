import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  templatesConfigObject,
  templatesConfigObjectRequest,
  templatesConfigObjectResponse,
} from './templates-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfTemplatesConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(templatesConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfTemplatesConfigObjects} arrayOfTemplatesConfigObjects
 * @property {TemplatesConfigObject[]}
 * @property {Links}
 */
export type ArrayOfTemplatesConfigObjects = z.infer<typeof arrayOfTemplatesConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfTemplatesConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(templatesConfigObjectResponse).optional(),
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
export const arrayOfTemplatesConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(templatesConfigObjectRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
