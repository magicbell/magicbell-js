import { z } from 'zod';

import { authedUser, authedUserRequest, authedUserResponse } from './authed-user';
import { enterprise, enterpriseRequest, enterpriseResponse } from './enterprise';
import { incomingWebhook, incomingWebhookRequest, incomingWebhookResponse } from './incoming-webhook';
import { team, teamRequest, teamResponse } from './team';

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
      .regex(/^[A-Z0-9\/]*$/)
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
        .regex(/^[A-Z0-9\/]*$/)
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
      accessToken: z.string().nullish(),
      appId: z.string().nullish(),
      authedUser: authedUserRequest.nullish(),
      botUserId: z.string().nullish(),
      enterprise: enterpriseRequest.nullish(),
      expiresIn: z.number().nullish(),
      id: z.string().nullish(),
      incomingWebhook: incomingWebhookRequest.nullish(),
      isEnterpriseInstall: z.boolean().nullish(),
      refreshToken: z.string().nullish(),
      scope: z.string().nullish(),
      team: teamRequest.nullish(),
      tokenType: z.string().nullish(),
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
