import { z } from 'zod';

import { email, emailRequest, emailResponse } from './email.js';
import { inApp, inAppRequest, inAppResponse } from './in-app.js';
import { mobilePush, mobilePushRequest, mobilePushResponse } from './mobile-push.js';
import { slack, slackRequest, slackResponse } from './slack.js';
import { sms, smsRequest, smsResponse } from './sms.js';
import { webPush, webPushRequest, webPushResponse } from './web-push.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const channels = z.lazy(() => {
  return z.object({
    email: email.optional(),
    inApp: inApp.optional(),
    mobilePush: mobilePush.optional(),
    slack: slack.optional(),
    sms: sms.optional(),
    webPush: webPush.optional(),
  });
});

/**
 *
 * @typedef  {Channels} channels
 * @property {Email}
 * @property {InApp}
 * @property {MobilePush}
 * @property {Slack}
 * @property {Sms}
 * @property {WebPush}
 */
export type Channels = z.infer<typeof channels>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const channelsResponse = z.lazy(() => {
  return z
    .object({
      email: emailResponse.optional(),
      in_app: inAppResponse.optional(),
      mobile_push: mobilePushResponse.optional(),
      slack: slackResponse.optional(),
      sms: smsResponse.optional(),
      web_push: webPushResponse.optional(),
    })
    .transform((data) => ({
      email: data['email'],
      inApp: data['in_app'],
      mobilePush: data['mobile_push'],
      slack: data['slack'],
      sms: data['sms'],
      webPush: data['web_push'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const channelsRequest = z.lazy(() => {
  return z
    .object({
      email: emailRequest.nullish(),
      inApp: inAppRequest.nullish(),
      mobilePush: mobilePushRequest.nullish(),
      slack: slackRequest.nullish(),
      sms: smsRequest.nullish(),
      webPush: webPushRequest.nullish(),
    })
    .transform((data) => ({
      email: data['email'],
      in_app: data['inApp'],
      mobile_push: data['mobilePush'],
      slack: data['slack'],
      sms: data['sms'],
      web_push: data['webPush'],
    }));
});
