import { z } from 'zod';

import { links, linksRequest, linksResponse } from '../../common/links.js';
import {
  eventSourceIntegrationConfigObject,
  eventSourceIntegrationConfigObjectRequest,
  eventSourceIntegrationConfigObjectResponse,
} from './event-source-integration-config-object.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const arrayOfEventSourceIntegrationConfigObjects = z.lazy(() => {
  return z.object({
    data: z.array(eventSourceIntegrationConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {ArrayOfEventSourceIntegrationConfigObjects} arrayOfEventSourceIntegrationConfigObjects
 * @property {EventSourceIntegrationConfigObject[]}
 * @property {Links}
 */
export type ArrayOfEventSourceIntegrationConfigObjects = z.infer<typeof arrayOfEventSourceIntegrationConfigObjects>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const arrayOfEventSourceIntegrationConfigObjectsResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(eventSourceIntegrationConfigObjectResponse).optional(),
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
export const arrayOfEventSourceIntegrationConfigObjectsRequest = z.lazy(() => {
  return z
    .object({ data: z.array(eventSourceIntegrationConfigObjectRequest).optional(), links: linksRequest.optional() })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
