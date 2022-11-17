// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class PushSubscriptions extends Resource {
  path = 'push_subscriptions';
  entity = 'push_subscription';

  /**
   * Register a device
   **/
  create = createMethod({
    id: 'push-subscriptions-create',
    method: 'POST',
    beta: true,
  });

  /**
   * Unregister a device
   **/
  delete = createMethod({
    id: 'push-subscriptions-delete',
    method: 'DELETE',
    path: '{device_token}',
    beta: true,
  });
}
