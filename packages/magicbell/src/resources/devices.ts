import { createMethod } from '../method';
import { Resource } from '../resource';

export class Devices extends Resource {
  path = 'push_subscriptions';
  entity = 'push_subscription';

  create = createMethod({
    method: 'POST',
  });

  delete = createMethod({
    method: 'DELETE',
    path: '{device_token}',
  });
}
