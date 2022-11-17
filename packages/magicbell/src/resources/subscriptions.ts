// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class Subscriptions extends Resource {
  path = 'subscriptions';
  entity = 'subscription';

  /**
   * List subscriptions
   **/
  list = createMethod({
    id: 'subscriptions-list',
    method: 'GET',
    type: 'list',
  });

  /**
   * Create a topic subscription
   **/
  create = createMethod({
    id: 'subscriptions-create',
    method: 'POST',
  });

  /**
   * Unsubscribe from a topic
   **/
  unsubscribe = createMethod({
    id: 'subscriptions-unsubscribe',
    method: 'POST',
    path: '{topic}/unsubscribe',
  });

  /**
   * Show a topic subscription
   **/
  get = createMethod({
    id: 'subscriptions-get',
    method: 'GET',
    path: '{topic}',
  });

  /**
   * Delete topic subscription(s)
   **/
  delete = createMethod({
    id: 'subscriptions-delete',
    method: 'DELETE',
    path: '{topic}',
  });
}
