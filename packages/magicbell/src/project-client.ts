import { RequestClient } from './lib/request-client';
import { assertHasRequiredOptions } from './options';
import { Broadcasts } from './project-resources/broadcasts';
import { Imports } from './project-resources/imports';
import { Metrics } from './project-resources/metrics';
import { Notifications } from './project-resources/notifications';
import { Users } from './project-resources/users';
import { ClientOptions as RequestClientOptions, WithRequired } from './types';

export type ClientOptions = WithRequired<RequestClientOptions, 'apiKey' | 'apiSecret'>;

export class Client extends RequestClient {
  broadcasts = new Broadcasts(this);
  imports = new Imports(this);
  metrics = new Metrics(this);
  notifications = new Notifications(this);
  users = new Users(this);

  constructor(options: ClientOptions) {
    assertHasRequiredOptions(options, ['apiKey', 'apiSecret']);
    super(options);
  }
}
