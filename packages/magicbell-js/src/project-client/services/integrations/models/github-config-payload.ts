import { z } from 'zod';

/**
 * Zod schema for the GithubConfigPayload model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the GithubConfigPayload application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the GithubConfigPayload application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
