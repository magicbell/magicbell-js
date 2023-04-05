// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../resource';
import * as schemas from '../schemas/imports';
import { type RequestOptions } from '../types';

type CreateImportsResponse = FromSchema<typeof schemas.CreateImportsResponseSchema>;
type CreateImportsPayload = FromSchema<typeof schemas.CreateImportsPayloadSchema>;
type GetImportsResponse = FromSchema<typeof schemas.GetImportsResponseSchema>;

export class Imports extends Resource {
  path = 'imports';
  entity = 'import';

  /**
   * Enqueues an import - currently only supported for users. Amongst other things,
   * the users import allows associating slack channels (if you have already setup
   * the oauth apps).
   *
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  create(options?: RequestOptions): Promise<CreateImportsResponse>;

  /**
   * Enqueues an import - currently only supported for users. Amongst other things,
   * the users import allows associating slack channels (if you have already setup
   * the oauth apps).
   *
   * @param data
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  create(data: CreateImportsPayload, options?: RequestOptions): Promise<CreateImportsResponse>;

  create(
    dataOrOptions: CreateImportsPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<CreateImportsResponse> {
    this.assertFeatureFlag('imports-create');

    return this.request(
      {
        method: 'POST',
      },
      dataOrOptions,
      options,
    );
  }

  /**
   * Query the status of the import for a summary of imported records and failures
   * for each record that could not be imported successfully.
   *
   * @param importId - ID of the import.
   *   The ID of the import is returned when the import is created.
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  get(importId: string, options?: RequestOptions): Promise<GetImportsResponse> {
    this.assertFeatureFlag('imports-get');

    return this.request(
      {
        method: 'GET',
        path: '{import_id}',
      },
      importId,
      options,
    );
  }
}
