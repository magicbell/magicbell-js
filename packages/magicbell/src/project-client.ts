import { Client } from './client/client';
import { assertHasRequiredOptions } from './client/options';
import { ClientOptions, WithRequired } from './client/types';
import { isString } from './lib/utils';
import { Broadcasts } from './project-resources/broadcasts';
import { Imports } from './project-resources/imports';
import { Metrics } from './project-resources/metrics';
import { Users } from './project-resources/users';

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
