import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { MailgunConfig, mailgunConfig, mailgunConfigRequest, mailgunConfigResponse } from './mailgun-config.js';

/**
 * Zod schema for the MailgunConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the MailgunConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the MailgunConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
