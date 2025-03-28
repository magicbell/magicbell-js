import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { expoTokenResponse, expoTokenResponseRequest, expoTokenResponseResponse } from './expo-token-response.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfExpoTokenResponses = z.lazy(() => {
  return z.object({
    data: z.array(expoTokenResponse).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfExpoTokenResponses} arrayOfExpoTokenResponses
 * @property {ExpoTokenResponse[]}
 * @property {Links}
 */
export type ArrayOfExpoTokenResponses = z.infer<typeof arrayOfExpoTokenResponses>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfExpoTokenResponsesResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(expoTokenResponseResponse).optional(),
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
export const arrayOfExpoTokenResponsesRequest = z.lazy(() => {
  return z
    .object({ data: z.array(expoTokenResponseRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
