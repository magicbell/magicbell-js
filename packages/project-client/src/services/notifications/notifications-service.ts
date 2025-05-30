import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { DeliveryPlanCollection, deliveryPlanCollectionResponse } from './models/delivery-plan-collection.js';

export class NotificationsService extends BaseService {
  /**
   * Get the delivery plan for a notification.
   * @param {string} notificationId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DeliveryPlanCollection>>} OK
   */
  async getDeliveryplan(
    notificationId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DeliveryPlanCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/notifications/{notification_id}/deliveryplan')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: deliveryPlanCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'notification_id',
        value: notificationId,
      })
      .build();
    return this.client.call<DeliveryPlanCollection>(request);
  }
}
