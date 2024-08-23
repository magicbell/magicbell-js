import { Environment } from './http/environment';
import { SdkConfig } from './http/types';
import { BroadcastsService } from './services/broadcasts';
import { ChannelsService } from './services/channels';
import { IntegrationsService } from './services/integrations';
import { JwtService } from './services/jwt';

export type * from './http';
export * from './services/broadcasts';
export * from './services/channels';
export * from './services/integrations';
export * from './services/jwt';

export class Client {
  public readonly broadcasts: BroadcastsService;

  public readonly integrations: IntegrationsService;

  public readonly jwt: JwtService;

  public readonly channels: ChannelsService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    this.broadcasts = new BroadcastsService(this.config);

    this.integrations = new IntegrationsService(this.config);

    this.jwt = new JwtService(this.config);

    this.channels = new ChannelsService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.broadcasts.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
    this.jwt.baseUrl = baseUrl;
    this.channels.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.broadcasts.baseUrl = environment;
    this.integrations.baseUrl = environment;
    this.jwt.baseUrl = environment;
    this.channels.baseUrl = environment;
  }

  set timeout(timeout: number) {
    this.broadcasts.timeout = timeout;
    this.integrations.timeout = timeout;
    this.jwt.timeout = timeout;
    this.channels.timeout = timeout;
  }

  set token(token: string) {
    this.broadcasts.token = token;
    this.integrations.token = token;
    this.jwt.token = token;
    this.channels.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
