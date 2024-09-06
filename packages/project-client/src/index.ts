import { Environment } from './http/environment.js';
import { SdkConfig } from './http/types.js';
import { BroadcastsService } from './services/broadcasts/index.js';
import { ChannelsService } from './services/channels/index.js';
import { IntegrationsService } from './services/integrations/index.js';
import { JwtService } from './services/jwt/index.js';

export type * from './http/index.js';
export * from './services/broadcasts/index.js';
export * from './services/channels/index.js';
export * from './services/integrations/index.js';
export * from './services/jwt/index.js';

export class Client {
  public readonly broadcasts: BroadcastsService;

  public readonly channels: ChannelsService;

  public readonly integrations: IntegrationsService;

  public readonly jwt: JwtService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    this.broadcasts = new BroadcastsService(this.config);

    this.channels = new ChannelsService(this.config);

    this.integrations = new IntegrationsService(this.config);

    this.jwt = new JwtService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.broadcasts.baseUrl = baseUrl;
    this.channels.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
    this.jwt.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.broadcasts.baseUrl = environment;
    this.channels.baseUrl = environment;
    this.integrations.baseUrl = environment;
    this.jwt.baseUrl = environment;
  }

  set timeout(timeout: number) {
    this.broadcasts.timeout = timeout;
    this.channels.timeout = timeout;
    this.integrations.timeout = timeout;
    this.jwt.timeout = timeout;
  }

  set token(token: string) {
    this.broadcasts.token = token;
    this.channels.token = token;
    this.integrations.token = token;
    this.jwt.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
