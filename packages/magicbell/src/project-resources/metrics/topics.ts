// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { Resource } from '../../client/resource';
import { type RequestOptions } from '../../client/types';
import * as schemas from '../../schemas/metrics/topics';

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
