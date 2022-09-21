// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class Users extends Resource {
  path = 'users';
  entity = 'user';

  /**
   * Create a user
   **/
  create = createMethod({
    method: 'POST',
  });

  /**
   * Update a user
   **/
  update = createMethod({
    method: 'PUT',
    path: '{user_id}',
  });

  /**
   * Delete a user
   **/
  delete = createMethod({
    method: 'DELETE',
    path: '{user_id}',
  });

  /**
   * Update a user by email
   **/
  updateByEmail = createMethod({
    method: 'PUT',
    path: 'email:{user_email}',
  });

  /**
   * Delete a user by email
   **/
  deleteByEmail = createMethod({
    method: 'DELETE',
    path: 'email:{user_email}',
  });

  /**
   * Update a user by external ID
   **/
  updateByExternalId = createMethod({
    method: 'PUT',
    path: 'external_id:{external_id}',
  });

  /**
   * Delete a user by external ID
   **/
  deleteByExternalId = createMethod({
    method: 'DELETE',
    path: 'external_id:{external_id}',
  });
}
