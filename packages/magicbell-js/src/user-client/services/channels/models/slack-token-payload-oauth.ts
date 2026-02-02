import { z } from 'zod';

/**
 * Zod schema for the SlackTokenPayloadOauth model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackTokenPayloadOauth = z.lazy(() => {
  return z.object({
    channelId: z.string(),
    installationId: z.string(),
    scope: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackTokenPayloadOauth} slackTokenPayloadOauth
 * @property {string} - The ID of the Slack channel this installation is associated with
 * @property {string} - A unique identifier for this Slack workspace installation
 * @property {string} - The OAuth scope granted during installation
 */
export type SlackTokenPayloadOauth = z.infer<typeof slackTokenPayloadOauth>;

/**
 * Zod schema for mapping API responses to the SlackTokenPayloadOauth application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenPayloadOauthResponse = z.lazy(() => {
  return z
    .object({
      channel_id: z.string(),
      installation_id: z.string(),
      scope: z.string().optional(),
    })
    .transform((data) => ({
      channelId: data['channel_id'],
      installationId: data['installation_id'],
      scope: data['scope'],
    }));
});

/**
 * Zod schema for mapping the SlackTokenPayloadOauth application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackTokenPayloadOauthRequest = z.lazy(() => {
  return z
    .object({
      channelId: z.string(),
      installationId: z.string(),
      scope: z.string().optional(),
    })
    .transform((data) => ({
      channel_id: data['channelId'],
      installation_id: data['installationId'],
      scope: data['scope'],
    }));
});
