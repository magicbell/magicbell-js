import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const providers = z.lazy(() => {
  return z.object({
    apns: z.any().optional(),
    expo: z.any().optional(),
    fcm: z.any().optional(),
    mailgun: z.any().optional(),
    sendgrid: z.any().optional(),
    ses: z.any().optional(),
    slack: z.any().optional(),
    teams: z.any().optional(),
    twilio: z.any().optional(),
    webPush: z.any().optional(),
  });
});

/**
 * Overrides that are scoped to specific providers for a channel.
 * @typedef  {Providers} providers - Overrides that are scoped to specific providers for a channel. - Overrides that are scoped to specific providers for a channel.
 * @property {any} - Provider-specific overrides for Apple Push Notification service.
 * @property {any} - Provider-specific overrides for Expo push notifications.
 * @property {any} - Provider-specific overrides for Firebase Cloud Messaging.
 * @property {any} - Provider-specific overrides for Mailgun.
 * @property {any} - Provider-specific overrides for Sendgrid.
 * @property {any} - Provider-specific overrides for AWS SES.
 * @property {any} - Provider-specific overrides for Slack.
 * @property {any} - Provider-specific overrides for Microsoft Teams.
 * @property {any} - Provider-specific overrides for Twilio.
 * @property {any} - Provider-specific overrides for the web push provider.
 */
export type Providers = z.infer<typeof providers>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const providersResponse = z.lazy(() => {
  return z
    .object({
      apns: z.any().optional(),
      expo: z.any().optional(),
      fcm: z.any().optional(),
      mailgun: z.any().optional(),
      sendgrid: z.any().optional(),
      ses: z.any().optional(),
      slack: z.any().optional(),
      teams: z.any().optional(),
      twilio: z.any().optional(),
      web_push: z.any().optional(),
    })
    .transform((data) => ({
      apns: data['apns'],
      expo: data['expo'],
      fcm: data['fcm'],
      mailgun: data['mailgun'],
      sendgrid: data['sendgrid'],
      ses: data['ses'],
      slack: data['slack'],
      teams: data['teams'],
      twilio: data['twilio'],
      webPush: data['web_push'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const providersRequest = z.lazy(() => {
  return z
    .object({
      apns: z.any().optional(),
      expo: z.any().optional(),
      fcm: z.any().optional(),
      mailgun: z.any().optional(),
      sendgrid: z.any().optional(),
      ses: z.any().optional(),
      slack: z.any().optional(),
      teams: z.any().optional(),
      twilio: z.any().optional(),
      webPush: z.any().optional(),
    })
    .transform((data) => ({
      apns: data['apns'],
      expo: data['expo'],
      fcm: data['fcm'],
      mailgun: data['mailgun'],
      sendgrid: data['sendgrid'],
      ses: data['ses'],
      slack: data['slack'],
      teams: data['teams'],
      twilio: data['twilio'],
      web_push: data['webPush'],
    }));
});
