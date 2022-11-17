// This file is generated. Do not update manually!
import { createMethod } from '../method';
import { Resource } from '../resource';

export class Imports extends Resource {
  path = 'imports';
  entity = 'import';

  /**
   * Create a user import
   **/
  create = createMethod({
    id: 'imports-create',
    method: 'POST',
  });

  /**
   * Get a user import
   **/
  get = createMethod({
    id: 'imports-get',
    method: 'GET',
    path: '{import_id}',
  });
}
