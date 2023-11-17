// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../../client/resource';
import { type RequestOptions } from '../../client/types';
import * as schemas from '../../schemas/metrics/categories';

type GetMetricsCategoriesResponse = FromSchema<typeof schemas.GetMetricsCategoriesResponseSchema>;

export class MetricsCategories extends Resource {
  path = 'metrics';
  entity = 'categorie';

  /**
   * Query the metrics of broadcasts and their recipients, grouped by category.
   *
   * @param options - override client request options.
   * @returns
   **/
  get(options?: RequestOptions): Promise<GetMetricsCategoriesResponse> {
    return this.request(
      {
        method: 'GET',
        path: 'categories',
      },
      options,
    );
  }
}
