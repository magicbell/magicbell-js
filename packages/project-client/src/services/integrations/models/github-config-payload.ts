import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const githubConfigPayload = z.lazy(() => {
  return z.object({
    webhookSigningSecret: z.string().min(1).max(100),
  });
});

/**
 *
 * @typedef  {GithubConfigPayload} githubConfigPayload
 * @property {string} - The signing secret to verify incoming requests from Github
 */
export type GithubConfigPayload = z.infer<typeof githubConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const githubConfigPayloadResponse = z.lazy(() => {
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
export const githubConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      webhookSigningSecret: z.string().min(1).max(100),
    })
    .transform((data) => ({
      webhook_signing_secret: data['webhookSigningSecret'],
    }));
});
