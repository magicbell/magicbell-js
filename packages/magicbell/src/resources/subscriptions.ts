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
    method: 'GET',
    type: 'list',
  });

  /**
   * Create a topic subscription
   **/
  create = createMethod({
    method: 'POST',
  });

  /**
   * Unsubscribe from a topic
   **/
  unsubscribe = createMethod({
    method: 'POST',
    path: '{topic}/unsubscribe',
  });

  /**
   * Show a topic subscription
   **/
  retrieve = createMethod({
    method: 'GET',
    path: '{topic}',
  });

  /**
   * Delete topic subscription(s)
   **/
  delete = createMethod({
    method: 'DELETE',
    path: '{topic}',
  });
}
