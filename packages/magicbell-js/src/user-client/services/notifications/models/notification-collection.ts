import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Notification, notification, notificationRequest, notificationResponse } from './notification.js';

/**
 * Zod schema for the NotificationCollection model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const notificationCollection = z.lazy(() => {
  return z.object({
    data: z.array(notification).optional(),
    links: links.optional(),
  });
});

/**
 *
 * @typedef  {NotificationCollection} notificationCollection
 * @property {Notification[]}
 * @property {Links}
 */
export type NotificationCollection = z.infer<typeof notificationCollection>;

/**
 * Zod schema for mapping API responses to the NotificationCollection application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const notificationCollectionResponse = z.lazy(() => {
  return z
    .object({
      data: z.array(notificationResponse).optional(),
      links: linksResponse.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});

/**
 * Zod schema for mapping the NotificationCollection application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const notificationCollectionRequest = z.lazy(() => {
  return z
    .object({
      data: z.array(notificationRequest).optional(),
      links: linksRequest.optional(),
    })
    .transform((data) => ({
      data: data['data'],
      links: data['links'],
    }));
});
