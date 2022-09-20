import { createMethod } from '../method';
import { Resource } from '../resource';

export class Subscriptions extends Resource {
  path = 'subscriptions';
  entity = 'subscription';

  create = createMethod({
    method: 'POST',
  });

  list = createMethod({
    method: 'GET',
    type: 'list',
  });

  retrieve = createMethod({
    method: 'GET',
    path: '{topic}',
  });

  delete = createMethod({
    method: 'DELETE',
    path: '{topic}',
  });

  unsubscribe = createMethod({
    method: 'POST',
    path: '{topic}/unsubscribe',
  });
}
