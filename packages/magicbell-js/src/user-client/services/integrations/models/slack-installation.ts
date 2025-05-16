import { z } from 'zod';

import { AuthedUser, authedUser, authedUserRequest, authedUserResponse } from './authed-user.js';
import { Enterprise, enterprise, enterpriseRequest, enterpriseResponse } from './enterprise.js';
import {
  IncomingWebhook,
  incomingWebhook,
  incomingWebhookRequest,
  incomingWebhookResponse,
} from './incoming-webhook.js';
import { Team, team, teamRequest, teamResponse } from './team.js';

/**
 * The shape of the model inside the application code - what the users use
 */
export const slackInstallation = z.lazy(() => {
  return z.object({
    accessToken: z.string(),
    appId: z.string(),
    authedUser: authedUser,
    botUserId: z.string().optional(),
    enterprise: enterprise.optional(),
    expiresIn: z.number().optional(),
    id: z
      .string()
      .regex(/^[A-Z0-9]+-.*$/)
      .optional(),
    incomingWebhook: incomingWebhook.optional(),
    isEnterpriseInstall: z.boolean().optional(),
    refreshToken: z.string().optional(),
    scope: z.string().optional(),
    team: team,
    tokenType: z.string().optional(),
  });
});

/**
 *
 * @typedef  {SlackInstallation} slackInstallation
 * @property {string}
 * @property {string}
 * @property {AuthedUser}
 * @property {string}
 * @property {Enterprise}
 * @property {number}
 * @property {string}
 * @property {IncomingWebhook}
 * @property {boolean}
 * @property {string}
 * @property {string}
 * @property {Team}
 * @property {string}
 */
export type SlackInstallation = z.infer<typeof slackInstallation>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const slackInstallationResponse = z.lazy(() => {
  return z
    .object({
      access_token: z.string(),
      app_id: z.string(),
      authed_user: authedUserResponse,
      bot_user_id: z.string().optional(),
      enterprise: enterpriseResponse.optional(),
      expires_in: z.number().optional(),
      id: z
        .string()
        .regex(/^[A-Z0-9]+-.*$/)
        .optional(),
      incoming_webhook: incomingWebhookResponse.optional(),
      is_enterprise_install: z.boolean().optional(),
      refresh_token: z.string().optional(),
      scope: z.string().optional(),
      team: teamResponse,
      token_type: z.string().optional(),
    })
    .transform((data) => ({
      accessToken: data['access_token'],
      appId: data['app_id'],
      authedUser: data['authed_user'],
      botUserId: data['bot_user_id'],
      enterprise: data['enterprise'],
      expiresIn: data['expires_in'],
      id: data['id'],
      incomingWebhook: data['incoming_webhook'],
      isEnterpriseInstall: data['is_enterprise_install'],
      refreshToken: data['refresh_token'],
      scope: data['scope'],
      team: data['team'],
      tokenType: data['token_type'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const slackInstallationRequest = z.lazy(() => {
  return z
    .object({
      accessToken: z.string(),
      appId: z.string(),
      authedUser: authedUserRequest,
      botUserId: z.string().optional(),
      enterprise: enterpriseRequest.optional(),
      expiresIn: z.number().optional(),
      id: z
        .string()
        .regex(/^[A-Z0-9]+-.*$/)
        .optional(),
      incomingWebhook: incomingWebhookRequest.optional(),
      isEnterpriseInstall: z.boolean().optional(),
      refreshToken: z.string().optional(),
      scope: z.string().optional(),
      team: teamRequest,
      tokenType: z.string().optional(),
    })
    .transform((data) => ({
      access_token: data['accessToken'],
      app_id: data['appId'],
      authed_user: data['authedUser'],
      bot_user_id: data['botUserId'],
      enterprise: data['enterprise'],
      expires_in: data['expiresIn'],
      id: data['id'],
      incoming_webhook: data['incomingWebhook'],
      is_enterprise_install: data['isEnterpriseInstall'],
      refresh_token: data['refreshToken'],
      scope: data['scope'],
      team: data['team'],
      token_type: data['tokenType'],
    }));
});
