import { z } from 'zod';

import { Links, links, linksRequest, linksResponse } from '../../common/links.js';
import { Notification, notification, notificationRequest, notificationResponse } from './notification.js';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
