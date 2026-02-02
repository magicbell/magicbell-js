import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { SendgridConfig, sendgridConfig, sendgridConfigRequest, sendgridConfigResponse } from './sendgrid-config.js';

/**
 * Zod schema for the SendgridConfigCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SendgridConfigCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SendgridConfigCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
