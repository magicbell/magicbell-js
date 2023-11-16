// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../client/resource';
import { type RequestOptions } from '../client/types';
import * as schemas from '../schemas/metrics';
import { MetricsCategories } from './metrics/categories';
import { MetricsTopics } from './metrics/topics';

type GetMetricsResponse = FromSchema<typeof schemas.GetMetricsResponseSchema>;

export class Metrics extends Resource {
  path = 'metrics';
  entity = 'metric';
  categories = new MetricsCategories(this.client);
  topics = new MetricsTopics(this.client);

  /**
   * Query the metrics of broadcasts and their recipients.
   *
   * @param options - override client request options.
   * @returns
   **/
  get(options?: RequestOptions): Promise<GetMetricsResponse> {
    return this.request(
      {
        method: 'GET',
      },
      options,
    );
  }
}
