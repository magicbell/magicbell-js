import { z } from 'zod';

/**
 * Zod schema for the SlackStartInstallResponseContent model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
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
 * Zod schema for mapping API responses to the SlackStartInstallResponseContent application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
 * Zod schema for mapping the SlackStartInstallResponseContent application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
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
