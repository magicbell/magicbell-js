import { ChannelsService } from './services/channels/Channels';
import { IntegrationsService } from './services/integrations/Integrations';

export * from './models';
export * as ChannelsModels from './services/channels';
export * as IntegrationsModels from './services/integrations';

type Config = {
  accessToken?: string;
};

export * from './http/errors';

/**
 * OpenAPI 3.1.0 Specification for MagicBell API.
 */
export class Client {
  public channels: ChannelsService;
  public integrations: IntegrationsService;

  constructor({ accessToken = '' }: Config) {
    this.channels = new ChannelsService(accessToken);
    this.integrations = new IntegrationsService(accessToken);
  }

  /**
   * Sets the baseUrl that the SDK will use for its requests.
   * @param {string} url
   */
  setBaseUrl(url: string): void {
    this.channels.setBaseUrl(url);
    this.integrations.setBaseUrl(url);
  }

  /**
   * Sets the access token used to authenticate.
   * @param {string} accessToken
   */
  setAccessToken(accessToken: string) {
    this.channels.setAccessToken(accessToken);
    this.integrations.setAccessToken(accessToken);
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
