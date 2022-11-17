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
    id: 'users-create',
    method: 'POST',
  });

  /**
   * Update a user
   **/
  update = createMethod({
    id: 'users-update',
    method: 'PUT',
    path: '{user_id}',
  });

  /**
   * Delete a user
   **/
  delete = createMethod({
    id: 'users-delete',
    method: 'DELETE',
    path: '{user_id}',
  });

  /**
   * Update a user by email
   **/
  updateByEmail = createMethod({
    id: 'users-update-by-email',
    method: 'PUT',
    path: 'email:{user_email}',
  });

  /**
   * Delete a user by email
   **/
  deleteByEmail = createMethod({
    id: 'users-delete-by-email',
    method: 'DELETE',
    path: 'email:{user_email}',
  });

  /**
   * Update a user by external ID
   **/
  updateByExternalId = createMethod({
    id: 'users-update-by-external-id',
    method: 'PUT',
    path: 'external_id:{external_id}',
  });

  /**
   * Delete a user by external ID
   **/
  deleteByExternalId = createMethod({
    id: 'users-delete-by-external-id',
    method: 'DELETE',
    path: 'external_id:{external_id}',
  });
}
