import { z } from 'zod';

import {
  WebPushTokenPayloadKeys,
  webPushTokenPayloadKeys,
  webPushTokenPayloadKeysRequest,
  webPushTokenPayloadKeysResponse,
} from '../channels/models/web-push-token-payload-keys.js';

/**
 * Zod schema for the WebPushTokenPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const webPushTokenPayload = z.lazy(() => {
  return z.object({
    endpoint: z.string(),
    keys: webPushTokenPayloadKeys,
  });
});

/**
 *
 * @typedef  {WebPushTokenPayload} webPushTokenPayload
 * @property {string} - The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to.
 * @property {WebPushTokenPayloadKeys} - The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.
 */
export type WebPushTokenPayload = z.infer<typeof webPushTokenPayload>;

/**
 * Zod schema for mapping API responses to the WebPushTokenPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenPayloadResponse = z.lazy(() => {
  return z
    .object({
      endpoint: z.string(),
      keys: webPushTokenPayloadKeysResponse,
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
      keys: data['keys'],
    }));
});

/**
 * Zod schema for mapping the WebPushTokenPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const webPushTokenPayloadRequest = z.lazy(() => {
  return z
    .object({
      endpoint: z.string(),
      keys: webPushTokenPayloadKeysRequest,
    })
    .transform((data) => ({
      endpoint: data['endpoint'],
      keys: data['keys'],
    }));
});
