import { Environment } from './http/environment.js';
import { SdkConfig } from './http/types.js';
import { ChannelsService } from './services/channels/index.js';
import { IntegrationsService } from './services/integrations/index.js';
import { NotificationsService } from './services/notifications/index.js';

export { Environment } from './http/environment.js';
export * from './http/index.js';
export * from './services/channels/index.js';
export * from './services/common/index.js';
export * from './services/integrations/index.js';
export * from './services/notifications/index.js';

export class Client {
  public readonly channels: ChannelsService;

  public readonly integrations: IntegrationsService;

  public readonly notifications: NotificationsService;

  constructor(public config: SdkConfig) {
    this.channels = new ChannelsService(this.config);

    this.integrations = new IntegrationsService(this.config);

    this.notifications = new NotificationsService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.channels.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
    this.notifications.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.channels.baseUrl = environment;
    this.integrations.baseUrl = environment;
    this.notifications.baseUrl = environment;
  }

  set timeoutMs(timeoutMs: number) {
    this.channels.timeoutMs = timeoutMs;
    this.integrations.timeoutMs = timeoutMs;
    this.notifications.timeoutMs = timeoutMs;
  }

  set token(token: string) {
    this.channels.token = token;
    this.integrations.token = token;
    this.notifications.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
