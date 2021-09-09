export type WebPushConfig = {
  subscribeUrl: string;
  vapidAuthentication: { publicKey: string };
};

export interface Channel<T> {
  enabled: boolean;
  config: T;
}

export type Channels = {
  webPush: Channel<WebPushConfig>;
};

export type InboxConfig = {
  features;
};

export type WebSocketConfig = {
  region: string;
  channel: string;
  authUrl: string;
};

export default interface IRemoteConfig {
  channels?: Channels;
  inbox?: InboxConfig;
  ws?: WebSocketConfig;
}
