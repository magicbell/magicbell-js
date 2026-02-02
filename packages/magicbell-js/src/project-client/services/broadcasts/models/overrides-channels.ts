import { z } from 'zod';

import { Email, email, emailRequest, emailResponse } from './email.js';
import { InApp, inApp, inAppRequest, inAppResponse } from './in-app.js';
import { MobilePush, mobilePush, mobilePushRequest, mobilePushResponse } from './mobile-push.js';
import { Sms, sms, smsRequest, smsResponse } from './sms.js';

/**
 * Zod schema for the OverridesChannels model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const overridesChannels = z.lazy(() => {
  return z.object({
    email: email.optional(),
    inApp: inApp.optional(),
    mobilePush: mobilePush.optional(),
    sms: sms.optional(),
  });
});

/**
 * Overrides that are scoped to individual delivery channels.
 * @typedef  {OverridesChannels} overridesChannels - Overrides that are scoped to individual delivery channels. - Overrides that are scoped to individual delivery channels.
 * @property {Email} - Overrides for email notifications.
 * @property {InApp} - Overrides for in-app notifications.
 * @property {MobilePush} - Overrides for mobile push notifications.
 * @property {Sms} - Overrides for SMS notifications.
 */
export type OverridesChannels = z.infer<typeof overridesChannels>;

/**
 * Zod schema for mapping API responses to the OverridesChannels application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const overridesChannelsResponse = z.lazy(() => {
  return z
    .object({
      email: emailResponse.optional(),
      in_app: inAppResponse.optional(),
      mobile_push: mobilePushResponse.optional(),
      sms: smsResponse.optional(),
    })
    .transform((data) => ({
      email: data['email'],
      inApp: data['in_app'],
      mobilePush: data['mobile_push'],
      sms: data['sms'],
    }));
});

/**
 * Zod schema for mapping the OverridesChannels application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const overridesChannelsRequest = z.lazy(() => {
  return z
    .object({
      email: emailRequest.optional(),
      inApp: inAppRequest.optional(),
      mobilePush: mobilePushRequest.optional(),
      sms: smsRequest.optional(),
    })
    .transform((data) => ({
      email: data['email'],
      in_app: data['inApp'],
      mobile_push: data['mobilePush'],
      sms: data['sms'],
    }));
});
