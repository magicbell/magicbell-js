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
   * Send a request to start the import of a list of users. The import allows the
   * creation of slack connections as well.
   *
   * @param options - override client request options.
   * @returns
   **/
  create(options?: RequestOptions): Promise<CreateImportsResponse>;

  /**
   * Send a request to start the import of a list of users. The import allows the
   * creation of slack connections as well.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   **/
  create(data: CreateImportsPayload, options?: RequestOptions): Promise<CreateImportsResponse>;

  create(
    dataOrOptions: CreateImportsPayload | RequestOptions,
    options?: RequestOptions,
  ): Promise<CreateImportsResponse> {
    return this.request(
      {
        method: 'POST',
      },
      dataOrOptions,
      options,
    );
  }

  /**
   * Send a request to query the status & errors of the import.
   *
   * @param importId - ID of the import.
   *   The ID of the import is returned when the import is created.
   * @param options - override client request options.
   * @returns
   **/
  get(importId: string, options?: RequestOptions): Promise<GetImportsResponse> {
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
