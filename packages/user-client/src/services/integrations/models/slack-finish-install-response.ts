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
 * @property {string}
 * @property {string}
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
    .object({ appId: z.string().nullish(), code: z.string().nullish(), redirectUrl: z.string().nullish() })
    .transform((data) => ({
      app_id: data['appId'],
      code: data['code'],
      redirect_url: data['redirectUrl'],
    }));
});
