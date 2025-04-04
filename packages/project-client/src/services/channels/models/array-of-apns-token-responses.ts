import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { apnsTokenResponse, apnsTokenResponseRequest, apnsTokenResponseResponse } from './apns-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfApnsTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(apnsTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfApnsTokenResponses} arrayOfApnsTokenResponses
 * @property {ApnsTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfApnsTokenResponses = z.infer<typeof arrayOfApnsTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfApnsTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(apnsTokenResponseResponse).optional(),
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
export const arrayOfApnsTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(apnsTokenResponseRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
