export interface SaveSlackInstallationRequest {
  access_token: string;
  app_id: string;
  authed_user: AuthedUser;
  bot_user_id?: string;
  enterprise?: Enterprise;
  expires_in?: number;
  id?: string;
  incoming_webhook?: IncomingWebhook;
  is_enterprise_install?: boolean;
  refresh_token?: string;
  scope?: string;
  team: Team;
  token_type?: string;
}
interface AuthedUser {
  access_token?: string;
  expires_in?: number;
  id: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}
interface Enterprise {
  id: string;
  name: string;
}
interface IncomingWebhook {
  channel: string;
  configuration_url: string;
  url: string;
}
interface Team {
  id: string;
  name?: string;
}
