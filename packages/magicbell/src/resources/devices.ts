// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class Devices extends Resource {
  path = 'push_subscriptions';
  entity = 'push_subscription';

  /**
   * Register a device
   **/
  create = createMethod({
    method: 'POST',
  });

  /**
   * Unregister a device
   **/
  delete = createMethod({
    method: 'DELETE',
    path: '{device_token}',
  });
}
