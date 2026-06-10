import { z } from 'zod';

/**
 * Zod schema for the SlackStartInstall model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const slackStartInstall = z.lazy(() => {
  return z.object({
    appId: z.string(),
    authUrl: z.string().optional(),
    extraScopes: z.array(z.string()).optional(),
    redirectUrl: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackStartInstall} slackStartInstall
 * @property {string} - Slack app ID that the installation flow should use.
 * @property {string} - Optional override for the authorization URL returned to the client.
 * @property {string[]} - Additional OAuth scopes to request during installation.
 * @property {string} - Custom redirect URL to use after OAuth completes.
 */
export type SlackStartInstall = z.infer<typeof slackStartInstall>;

/**
 * Zod schema for mapping API responses to the SlackStartInstall application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackStartInstallResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string(),
      auth_url: z.string().optional(),
      extra_scopes: z.array(z.string()).optional(),
      redirect_url: z.string().optional(),
    })
    .transform((data) => ({
      appId: data['app_id'],
      authUrl: data['auth_url'],
      extraScopes: data['extra_scopes'],
      redirectUrl: data['redirect_url'],
    }));
});

/**
 * Zod schema for mapping the SlackStartInstall application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const slackStartInstallRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string(),
      authUrl: z.string().optional(),
      extraScopes: z.array(z.string()).optional(),
      redirectUrl: z.string().optional(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      auth_url: data['authUrl'],
      extra_scopes: data['extraScopes'],
      redirect_url: data['redirectUrl'],
    }));
});
