import { z } from 'zod';

/**
 * Zod schema for the AuthedUser model.
 * Defines the structure and validation rules for this data type.
 * This is the shape used in application code - what developers interact with.
 */
export const authedUser = z.lazy(() => {
  return z.object({
    accessToken: z.string().optional(),
    expiresIn: z.number().optional(),
    id: z.string(),
    refreshToken: z.string().optional(),
    scope: z.string().optional(),
    tokenType: z.string().optional(),
  });
});

/**
 *
 * @typedef  {AuthedUser} authedUser
 * @property {string} - User token returned from the OAuth exchange.
 * @property {number} - Seconds until the user token expires.
 * @property {string} - Slack user ID for the installer.
 * @property {string} - Refresh token for the authed user.
 * @property {string} - Space-delimited OAuth scopes granted to the user token.
 * @property {string} - Token type value provided by Slack.
 */
export type AuthedUser = z.infer<typeof authedUser>;

/**
 * Zod schema for mapping API responses to the AuthedUser application shape.
 * Handles any property name transformations from the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const authedUserResponse = z.lazy(() => {
  return z
    .object({
      access_token: z.string().optional(),
      expires_in: z.number().optional(),
      id: z.string(),
      refresh_token: z.string().optional(),
      scope: z.string().optional(),
      token_type: z.string().optional(),
    })
    .transform((data) => ({
      accessToken: data['access_token'],
      expiresIn: data['expires_in'],
      id: data['id'],
      refreshToken: data['refresh_token'],
      scope: data['scope'],
      tokenType: data['token_type'],
    }));
});

/**
 * Zod schema for mapping the AuthedUser application shape to API requests.
 * Handles any property name transformations required by the API schema.
 * If property names match the API schema exactly, this is identical to the application shape.
 */
export const authedUserRequest = z.lazy(() => {
  return z
    .object({
      accessToken: z.string().optional(),
      expiresIn: z.number().optional(),
      id: z.string(),
      refreshToken: z.string().optional(),
      scope: z.string().optional(),
      tokenType: z.string().optional(),
    })
    .transform((data) => ({
      access_token: data['accessToken'],
      expires_in: data['expiresIn'],
      id: data['id'],
      refresh_token: data['refreshToken'],
      scope: data['scope'],
      token_type: data['tokenType'],
    }));
});
