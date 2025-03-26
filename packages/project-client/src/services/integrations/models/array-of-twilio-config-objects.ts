import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { twilioConfigObject, twilioConfigObjectRequest, twilioConfigObjectResponse } from './twilio-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfTwilioConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(twilioConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfTwilioConfigObjects} arrayOfTwilioConfigObjects
 * @property {TwilioConfigObject[]}
 * @property {Links}
 */
export type ArrayOfTwilioConfigObjects = z.infer<typeof arrayOfTwilioConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfTwilioConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(twilioConfigObjectResponse).optional(),
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
export const arrayOfTwilioConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(twilioConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
