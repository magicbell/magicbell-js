import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
