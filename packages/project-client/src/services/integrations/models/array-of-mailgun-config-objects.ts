import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  mailgunConfigObject,
  mailgunConfigObjectRequest,
  mailgunConfigObjectResponse,
} from './mailgun-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfMailgunConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(mailgunConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfMailgunConfigObjects} arrayOfMailgunConfigObjects
 * @property {MailgunConfigObject[]}
 * @property {Links}
 */
export type ArrayOfMailgunConfigObjects = z.infer<typeof arrayOfMailgunConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfMailgunConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(mailgunConfigObjectResponse).optional(),
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
export const arrayOfMailgunConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(mailgunConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
