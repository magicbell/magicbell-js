import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  webPushTokenResponse,
  webPushTokenResponseRequest,
  webPushTokenResponseResponse,
} from './web-push-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfWebPushTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(webPushTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfWebPushTokenResponses} arrayOfWebPushTokenResponses
 * @property {WebPushTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfWebPushTokenResponses = z.infer<typeof arrayOfWebPushTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfWebPushTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(webPushTokenResponseResponse).optional(),
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
export const arrayOfWebPushTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(webPushTokenResponseRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
