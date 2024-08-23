import { Environment } from './http/environment';
import { SdkConfig } from './http/types';
import { ChannelsService } from './services/channels';
import { IntegrationsService } from './services/integrations';

export type * from './http';
export * from './services/channels';
export * from './services/integrations';

export class Client {
  public readonly channels: ChannelsService;

  public readonly integrations: IntegrationsService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    this.channels = new ChannelsService(this.config);

    this.integrations = new IntegrationsService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.channels.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.channels.baseUrl = environment;
    this.integrations.baseUrl = environment;
  }

  set timeout(timeout: number) {
    this.channels.timeout = timeout;
    this.integrations.timeout = timeout;
  }

  set token(token: string) {
    this.channels.token = token;
    this.integrations.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
