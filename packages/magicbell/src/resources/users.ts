import { createMethod } from '../method';
import { Resource } from '../resource';

export class Users extends Resource {
  path = 'users';
  entity = 'user';

  create = createMethod({
    method: 'POST',
  });

  update = createMethod({
    method: 'PUT',
    path: '{user_id}',
  });

  updateByEmail = createMethod({
    method: 'PUT',
    path: 'email:{user_id}',
  });

  updateByExternalId = createMethod({
    method: 'PUT',
    path: 'external_id:{user_id}',
  });

  delete = createMethod({
    method: 'DELETE',
    path: '{user_id}',
  });

  deleteByEmail = createMethod({
    method: 'DELETE',
    path: 'email:{user_id}',
  });

  deleteByExternalId = createMethod({
    method: 'DELETE',
    path: 'external_id:{user_id}',
  });
}
