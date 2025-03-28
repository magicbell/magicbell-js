import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import { slackConfigObject, slackConfigObjectRequest, slackConfigObjectResponse } from './slack-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfSlackConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(slackConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfSlackConfigObjects} arrayOfSlackConfigObjects
 * @property {SlackConfigObject[]}
 * @property {Links}
 */
export type ArrayOfSlackConfigObjects = z.infer<typeof arrayOfSlackConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfSlackConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(slackConfigObjectResponse).optional(),
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
export const arrayOfSlackConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(slackConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
