import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import {
  SmtpConfigObject,
  smtpConfigObject,
  smtpConfigObjectRequest,
  smtpConfigObjectResponse,
} from './smtp-config-object.js';

/**
 * Zod schema for the SmtpConfigObjectCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const smtpConfigObjectCollection = z.lazy(() => {
  return z.object({
    data: z.array(smtpConfigObject).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {SmtpConfigObjectCollection} smtpConfigObjectCollection
 * @property {SmtpConfigObject[]}
 * @property {Links}
 */
export type SmtpConfigObjectCollection = z.infer<typeof smtpConfigObjectCollection>;

/**
 * Zod schema for mapping API responses to the SmtpConfigObjectCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigObjectCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(smtpConfigObjectResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the SmtpConfigObjectCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const smtpConfigObjectCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(smtpConfigObjectRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
