import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ApnsTokenWithMetadata, apnsTokenWithMetadataResponse } from './models/apns-token-with-metadata.js';
import {
  ArrayWithMetadataOfApnsToken,
  arrayWithMetadataOfApnsTokenResponse,
} from './models/array-with-metadata-of-apns-token.js';
import {
  ArrayWithMetadataOfExpoToken,
  arrayWithMetadataOfExpoTokenResponse,
} from './models/array-with-metadata-of-expo-token.js';
import {
  ArrayWithMetadataOfFcmToken,
  arrayWithMetadataOfFcmTokenResponse,
} from './models/array-with-metadata-of-fcm-token.js';
import {
  ArrayWithMetadataOfSlackToken,
  arrayWithMetadataOfSlackTokenResponse,
} from './models/array-with-metadata-of-slack-token.js';
import {
  ArrayWithMetadataOfTeamsToken,
  arrayWithMetadataOfTeamsTokenResponse,
} from './models/array-with-metadata-of-teams-token.js';
import {
  ArrayWithMetadataOfWebPushToken,
  arrayWithMetadataOfWebPushTokenResponse,
} from './models/array-with-metadata-of-web-push-token.js';
import {
  CategoryDeliveryPlan,
  categoryDeliveryPlanRequest,
  categoryDeliveryPlanResponse,
} from './models/category-delivery-plan.js';
import { DeliveryPlan, deliveryPlanRequest, deliveryPlanResponse } from './models/delivery-plan.js';
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoTokenWithMetadata, expoTokenWithMetadataResponse } from './models/expo-token-with-metadata.js';
import { FcmTokenWithMetadata, fcmTokenWithMetadataResponse } from './models/fcm-token-with-metadata.js';
import { SlackTokenWithMetadata, slackTokenWithMetadataResponse } from './models/slack-token-with-metadata.js';
import { TeamsTokenWithMetadata, teamsTokenWithMetadataResponse } from './models/teams-token-with-metadata.js';
import { WebPushTokenWithMetadata, webPushTokenWithMetadataResponse } from './models/web-push-token-with-metadata.js';

export class ChannelsService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<DeliveryPlan>>} OK
   */
  async getProjectDeliveryconfig(requestConfig?: RequestConfig): Promise<HttpResponse<DeliveryPlan>> {
    const request = new RequestBuilder<DeliveryPlan>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(z.any())
      .setResponseSchema(deliveryPlanResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<DeliveryPlan>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<DeliveryPlan>>} OK
   */
  async saveProjectDeliveryconfig(
    body: DeliveryPlan,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DeliveryPlan>> {
    const request = new RequestBuilder<DeliveryPlan>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('PUT')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(deliveryPlanRequest)
      .setResponseSchema(deliveryPlanResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<DeliveryPlan>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<CategoryDeliveryPlan>>} Created
   */
  async saveCategoriesDeliveryconfig(
    body: CategoryDeliveryPlan,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CategoryDeliveryPlan>> {
    const request = new RequestBuilder<CategoryDeliveryPlan>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('POST')
      .setPath('/channels/deliveryconfig/categories')
      .setRequestSchema(categoryDeliveryPlanRequest)
      .setResponseSchema(categoryDeliveryPlanResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<CategoryDeliveryPlan>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfApnsToken>>} OK
   */
  async getMobilePushApnsUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfApnsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfApnsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfApnsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfApnsToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ApnsTokenWithMetadata>>} OK
   */
  async getMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsTokenWithMetadata>> {
    const request = new RequestBuilder<ApnsTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(apnsTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ApnsTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfExpoToken>>} OK
   */
  async getMobilePushExpoUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfExpoToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfExpoToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfExpoTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfExpoToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ExpoTokenWithMetadata>>} OK
   */
  async getMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoTokenWithMetadata>> {
    const request = new RequestBuilder<ExpoTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(expoTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ExpoTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfFcmToken>>} OK
   */
  async getMobilePushFcmUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfFcmToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfFcmToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfFcmTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfFcmToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<FcmTokenWithMetadata>>} OK
   */
  async getMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmTokenWithMetadata>> {
    const request = new RequestBuilder<FcmTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(fcmTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<FcmTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfSlackToken>>} OK
   */
  async getSlackUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfSlackToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfSlackToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfSlackTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfSlackToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<SlackTokenWithMetadata>>} OK
   */
  async getSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackTokenWithMetadata>> {
    const request = new RequestBuilder<SlackTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(slackTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<SlackTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfTeamsToken>>} OK
   */
  async getTeamsUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfTeamsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfTeamsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfTeamsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfTeamsToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<TeamsTokenWithMetadata>>} OK
   */
  async getTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TeamsTokenWithMetadata>> {
    const request = new RequestBuilder<TeamsTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(teamsTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<TeamsTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfWebPushToken>>} OK
   */
  async getWebPushUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfWebPushToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfWebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfWebPushTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .build();
    return this.client.call<ArrayWithMetadataOfWebPushToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<WebPushTokenWithMetadata>>} OK
   */
  async getWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushTokenWithMetadata>> {
    const request = new RequestBuilder<WebPushTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(webPushTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<WebPushTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }
}
