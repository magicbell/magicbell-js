import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const githubConfig = z.lazy(() => {
  return z.object({
    webhookSigningSecret: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {GithubConfig} githubConfig
 * @property {string} - The signing secret to verify incoming requests from Github
 */
export type GithubConfig = z.infer<typeof githubConfig>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigResponse = z.lazy(() => {
  return z
    .object({
      webhook_signing_secret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      webhookSigningSecret: data['webhook_signing_secret'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigRequest = z.lazy(() => {
  return z.object({ webhookSigningSecret: z.string().nullish() }).transform((data) => ({
    webhook_signing_secret: data['webhookSigningSecret'],
  }));
});
