import { z } from 'zod';

/**
 * Zod schema for the SlackFinishInstallResponse model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackFinishInstallResponse = z.lazy(() => {
  return z.object({
    appId: z.string(),
    code: z.string(),
    redirectUrl: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackFinishInstallResponse} slackFinishInstallResponse
 * @property {string} - The app ID of the Slack app that was originally configured at the project-level.
 * @property {string} - The code that was returned from the OAuth flow, and found in the query string of the redirect URL.
 * @property {string}
 */
export type SlackFinishInstallResponse = z.infer<typeof slackFinishInstallResponse>;

/**
 * Zod schema for mapping API responses to the SlackFinishInstallResponse application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackFinishInstallResponseResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string(),
      code: z.string(),
      redirect_url: z.string().optional(),
    })
    .transform((data) => ({
      appId: data['app_id'],
      code: data['code'],
      redirectUrl: data['redirect_url'],
    }));
});

/**
 * Zod schema for mapping the SlackFinishInstallResponse application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackFinishInstallResponseRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string(),
      code: z.string(),
      redirectUrl: z.string().optional(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      code: data['code'],
      redirect_url: data['redirectUrl'],
    }));
});
