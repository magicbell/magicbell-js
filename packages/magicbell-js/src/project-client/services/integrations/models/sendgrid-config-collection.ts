import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SendgridConfig, sendgridConfig, sendgridConfigRequest, sendgridConfigResponse } from './sendgrid-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const sendgridConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(sendgridConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SendgridConfigCollection} sendgridConfigCollection
 * @property {SendgridConfig[]}
 * @property {Links}
 */
export type SendgridConfigCollection = z.infer<typeof sendgridConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const sendgridConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(sendgridConfigResponse).optional(),
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
export const sendgridConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(sendgridConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
