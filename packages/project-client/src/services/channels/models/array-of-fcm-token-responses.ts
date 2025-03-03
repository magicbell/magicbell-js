import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { fcmTokenResponse, fcmTokenResponseRequest, fcmTokenResponseResponse } from './fcm-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfFcmTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(fcmTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfFcmTokenResponses} arrayOfFcmTokenResponses
 * @property {FcmTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfFcmTokenResponses = z.infer<typeof arrayOfFcmTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfFcmTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(fcmTokenResponseResponse).optional(),
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
export const arrayOfFcmTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(fcmTokenResponseRequest).nullish(), links: linksRequest.nullish() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
