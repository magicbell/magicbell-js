import { Environment } from './http/environment.js';
import { SdkConfig } from './http/types.js';
import { BroadcastsService } from './services/broadcasts/index.js';
import { ChannelsService } from './services/channels/index.js';
import { EventsService } from './services/events/index.js';
import { IntegrationsService } from './services/integrations/index.js';
import { JwtService } from './services/jwt/index.js';
import { NotificationsService } from './services/notifications/index.js';
import { UsersService } from './services/users/index.js';

export { Environment } from './http/environment.js';
export * from './http/index.js';
export * from './services/broadcasts/index.js';
export * from './services/channels/index.js';
export * from './services/common/index.js';
export * from './services/events/index.js';
export * from './services/integrations/index.js';
export * from './services/jwt/index.js';
export * from './services/notifications/index.js';
export * from './services/users/index.js';

export class Client {
  public readonly broadcasts: BroadcastsService;

  public readonly channels: ChannelsService;

  public readonly events: EventsService;

  public readonly integrations: IntegrationsService;

  public readonly jwt: JwtService;

  public readonly notifications: NotificationsService;

  public readonly users: UsersService;

  constructor(public config: SdkConfig) {
    this.broadcasts = new BroadcastsService(this.config);

    this.channels = new ChannelsService(this.config);

    this.events = new EventsService(this.config);

    this.integrations = new IntegrationsService(this.config);

    this.jwt = new JwtService(this.config);

    this.notifications = new NotificationsService(this.config);

    this.users = new UsersService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.broadcasts.baseUrl = baseUrl;
    this.channels.baseUrl = baseUrl;
    this.events.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
    this.jwt.baseUrl = baseUrl;
    this.notifications.baseUrl = baseUrl;
    this.users.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.broadcasts.baseUrl = environment;
    this.channels.baseUrl = environment;
    this.events.baseUrl = environment;
    this.integrations.baseUrl = environment;
    this.jwt.baseUrl = environment;
    this.notifications.baseUrl = environment;
    this.users.baseUrl = environment;
  }

  set timeoutMs(timeoutMs: number) {
    this.broadcasts.timeoutMs = timeoutMs;
    this.channels.timeoutMs = timeoutMs;
    this.events.timeoutMs = timeoutMs;
    this.integrations.timeoutMs = timeoutMs;
    this.jwt.timeoutMs = timeoutMs;
    this.notifications.timeoutMs = timeoutMs;
    this.users.timeoutMs = timeoutMs;
  }

  set token(token: string) {
    this.broadcasts.token = token;
    this.channels.token = token;
    this.events.token = token;
    this.integrations.token = token;
    this.jwt.token = token;
    this.notifications.token = token;
    this.users.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
