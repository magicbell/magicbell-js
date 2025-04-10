import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackStartInstallResponseContent = z.lazy(() => {
  return z.object({
    appId: z.string().optional(),
    authUrl: z.string().optional(),
    scopes: z.array(z.string()).optional(),
  });
});

/**
 *
 * @typedef  {SlackStartInstallResponseContent} slackStartInstallResponseContent
 * @property {string}
 * @property {string}
 * @property {string[]}
 */
export type SlackStartInstallResponseContent = z.infer<typeof slackStartInstallResponseContent>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackStartInstallResponseContentResponse = z.lazy(() => {
  return z
    .object({
      app_id: z.string().optional(),
      auth_url: z.string().optional(),
      scopes: z.array(z.string()).optional(),
    })
    .transform((data) => ({
      appId: data['app_id'],
      authUrl: data['auth_url'],
      scopes: data['scopes'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackStartInstallResponseContentRequest = z.lazy(() => {
  return z
    .object({
      appId: z.string().optional(),
      authUrl: z.string().optional(),
      scopes: z.array(z.string()).optional(),
    })
    .transform((data) => ({
      app_id: data['appId'],
      auth_url: data['authUrl'],
      scopes: data['scopes'],
    }));
});
