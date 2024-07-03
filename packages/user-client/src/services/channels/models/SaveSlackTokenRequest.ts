export interface SaveSlackTokenRequest {
  oauth?: Oauth;
  webhook?: Webhook;
}
interface Oauth {
  channel_id: string;
  installation_id: string;
  scope?: string;
}
interface Webhook {
  url: string;
}
