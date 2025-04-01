import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { MailgunConfig, mailgunConfig, mailgunConfigRequest, mailgunConfigResponse } from './mailgun-config.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const mailgunConfigCollection = z.lazy(() => {
  return z.object({
    data: z.array(mailgunConfig).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {MailgunConfigCollection} mailgunConfigCollection
 * @property {MailgunConfig[]}
 * @property {Links}
 */
export type MailgunConfigCollection = z.infer<typeof mailgunConfigCollection>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const mailgunConfigCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(mailgunConfigResponse).optional(),
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
export const mailgunConfigCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(mailgunConfigRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
