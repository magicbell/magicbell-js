import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  SmtpConfigObject,
  smtpConfigObject,
  smtpConfigObjectRequest,
  smtpConfigObjectResponse,
} from './smtp-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const smtpConfigObjectCollection = z.lazy(() => {
  return z.object({
    data: z.array(smtpConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SmtpConfigObjectCollection} smtpConfigObjectCollection
 * @property {SmtpConfigObject[]}
 * @property {Links}
 */
export type SmtpConfigObjectCollection = z.infer<typeof smtpConfigObjectCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const smtpConfigObjectCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(smtpConfigObjectResponse).optional(),
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
export const smtpConfigObjectCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(smtpConfigObjectRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
