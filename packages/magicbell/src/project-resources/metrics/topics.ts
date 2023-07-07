// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../../resource';
import * as schemas from '../../schemas/metrics/topics';
import { type RequestOptions } from '../../types';

type GetMetricsTopicsResponse = FromSchema<typeof schemas.GetMetricsTopicsResponseSchema>;

export class MetricsTopics extends Resource {
  path = 'metrics';
  entity = 'topic';

  /**
   * Query the metrics of notification broadcasts and their recipients, grouped by
   * topic.
   *
   * @param options - override client request options.
   * @returns
   **/
  get(options?: RequestOptions): Promise<GetMetricsTopicsResponse> {
    return this.request(
      {
        method: 'GET',
        path: 'topics',
      },
      options,
    );
  }
}
