import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * @property {string}
 * @property {string}
 * @property {string[]}
 * @property {string}
 */
export type SlackStartInstall = z.infer<typeof slackStartInstall>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
