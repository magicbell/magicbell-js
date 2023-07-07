// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../../resource';
import * as schemas from '../../schemas/metrics/categories';
import { type RequestOptions } from '../../types';

type GetMetricsCategoriesResponse = FromSchema<typeof schemas.GetMetricsCategoriesResponseSchema>;

export class MetricsCategories extends Resource {
  path = 'metrics';
  entity = 'categorie';

  /**
   * Query the metrics of notification broadcasts and their recipients, grouped by
   * category.
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
