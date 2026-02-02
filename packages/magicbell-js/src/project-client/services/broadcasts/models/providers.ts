import { z } from 'zod';

/**
 * Zod schema for the Providers model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the Providers application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the Providers application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
