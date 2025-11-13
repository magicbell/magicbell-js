import { Environment } from './http/environment.js';
import { SdkConfig } from './http/types.js';
import { BroadcastsService } from './services/broadcasts/index.js';
import { ChannelsService } from './services/channels/index.js';
import { EventsService } from './services/events/index.js';
import { IntegrationsService } from './services/integrations/index.js';
import { UsersService } from './services/users/index.js';
import { WorkflowsService } from './services/workflows/index.js';

export { Environment } from './http/environment.js';
export * from './http/index.js';
export * from './services/broadcasts/index.js';
export * from './services/channels/index.js';
export * from './services/common/index.js';
export * from './services/events/index.js';
export * from './services/integrations/index.js';
export * from './services/users/index.js';
export * from './services/workflows/index.js';

export class Client {
  public readonly broadcasts: BroadcastsService;

  public readonly channels: ChannelsService;

  public readonly events: EventsService;

  public readonly integrations: IntegrationsService;

  public readonly users: UsersService;

  public readonly workflows: WorkflowsService;

  constructor(public config: SdkConfig) {
    this.broadcasts = new BroadcastsService(this.config);

    this.channels = new ChannelsService(this.config);

    this.events = new EventsService(this.config);

    this.integrations = new IntegrationsService(this.config);

    this.users = new UsersService(this.config);

    this.workflows = new WorkflowsService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.broadcasts.baseUrl = baseUrl;
    this.channels.baseUrl = baseUrl;
    this.events.baseUrl = baseUrl;
    this.integrations.baseUrl = baseUrl;
    this.users.baseUrl = baseUrl;
    this.workflows.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.broadcasts.baseUrl = environment;
    this.channels.baseUrl = environment;
    this.events.baseUrl = environment;
    this.integrations.baseUrl = environment;
    this.users.baseUrl = environment;
    this.workflows.baseUrl = environment;
  }

  set timeoutMs(timeoutMs: number) {
    this.broadcasts.timeoutMs = timeoutMs;
    this.channels.timeoutMs = timeoutMs;
    this.events.timeoutMs = timeoutMs;
    this.integrations.timeoutMs = timeoutMs;
    this.users.timeoutMs = timeoutMs;
    this.workflows.timeoutMs = timeoutMs;
  }

  set token(token: string) {
    this.broadcasts.token = token;
    this.channels.token = token;
    this.events.token = token;
    this.integrations.token = token;
    this.users.token = token;
    this.workflows.token = token;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
