import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  sendgridConfigObject,
  sendgridConfigObjectRequest,
  sendgridConfigObjectResponse,
} from './sendgrid-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfSendgridConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(sendgridConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfSendgridConfigObjects} arrayOfSendgridConfigObjects
 * @property {SendgridConfigObject[]}
 * @property {Links}
 */
export type ArrayOfSendgridConfigObjects = z.infer<typeof arrayOfSendgridConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfSendgridConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(sendgridConfigObjectResponse).optional(),
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
export const arrayOfSendgridConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(sendgridConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
