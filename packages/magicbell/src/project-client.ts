import { Client } from './client/client.js';
import { assertHasRequiredOptions } from './client/options.js';
import { ClientOptions, WithRequired } from './client/types.js';
import { isString } from './lib/utils.js';
import { Broadcasts } from './project-resources/broadcasts.js';
import { Imports } from './project-resources/imports.js';
import { Metrics } from './project-resources/metrics.js';
import { Users } from './project-resources/users.js';

export type ProjectClientOptions =
  | WithRequired<Omit<ClientOptions, 'userEmail' | 'userExternalId' | 'token'>, 'apiKey' | 'apiSecret'>
  | WithRequired<Omit<ClientOptions, 'userEmail' | 'userExternalId' | 'apiKey' | 'apiSecret'>, 'token'>;

export class ProjectClient extends Client {
  broadcasts = new Broadcasts(this);
  imports = new Imports(this);
  metrics = new Metrics(this);
  users = new Users(this);

  constructor(options: ProjectClientOptions) {
    if (!('token' in options) || !isString(options.token)) {
      assertHasRequiredOptions(options, ['apiKey', 'apiSecret']);
    }

    super(options);
  }
}
