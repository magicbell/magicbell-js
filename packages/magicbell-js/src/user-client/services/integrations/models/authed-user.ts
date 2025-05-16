import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
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
 * @property {string}
 * @property {number}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type AuthedUser = z.infer<typeof authedUser>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
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
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
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
