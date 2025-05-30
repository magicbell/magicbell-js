import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { ApnsToken, apnsTokenResponse } from './models/apns-token.js';
import { ApnsTokenCollection, apnsTokenCollectionResponse } from './models/apns-token-collection.js';
import {
  CategoryDeliveryConfig,
  categoryDeliveryConfigRequest,
  categoryDeliveryConfigResponse,
} from './models/category-delivery-config.js';
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoToken, expoTokenResponse } from './models/expo-token.js';
import { ExpoTokenCollection, expoTokenCollectionResponse } from './models/expo-token-collection.js';
import { FcmToken, fcmTokenResponse } from './models/fcm-token.js';
import { FcmTokenCollection, fcmTokenCollectionResponse } from './models/fcm-token-collection.js';
import { InboxTokenResponse, inboxTokenResponseResponse } from './models/inbox-token-response.js';
import {
  InboxTokenResponseCollection,
  inboxTokenResponseCollectionResponse,
} from './models/inbox-token-response-collection.js';
import { SlackToken, slackTokenResponse } from './models/slack-token.js';
import { SlackTokenCollection, slackTokenCollectionResponse } from './models/slack-token-collection.js';
import { TeamsToken, teamsTokenResponse } from './models/teams-token.js';
import { TeamsTokenCollection, teamsTokenCollectionResponse } from './models/teams-token-collection.js';
import { WebPushToken, webPushTokenResponse } from './models/web-push-token.js';
import { WebPushTokenCollection, webPushTokenCollectionResponse } from './models/web-push-token-collection.js';
import {
  GetDeliveryconfigParams,
  GetInAppInboxUserTokensParams,
  GetMobilePushApnsUserTokensParams,
  GetMobilePushExpoUserTokensParams,
  GetMobilePushFcmUserTokensParams,
  GetSlackUserTokensParams,
  GetTeamsUserTokensParams,
  GetWebPushUserTokensParams,
} from './request-params.js';

export class ChannelsService extends BaseService {
  /**
   *
   * @param {string} [params.key] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<CategoryDeliveryConfig>>} OK
   */
  async getDeliveryconfig(
    params?: GetDeliveryconfigParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CategoryDeliveryConfig>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: categoryDeliveryConfigResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addQueryParam({
        key: 'key',
        value: params?.key,
      })
      .build();
    return this.client.call<CategoryDeliveryConfig>(request);
  }

  /**
   *
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<CategoryDeliveryConfig>>} OK
   */
  async saveDeliveryconfig(
    body: CategoryDeliveryConfig,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CategoryDeliveryConfig>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/channels/deliveryconfig')
      .setRequestSchema(categoryDeliveryConfigRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: categoryDeliveryConfigResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<CategoryDeliveryConfig>(request);
  }

  /**
   * Lists all in_app tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxTokenResponseCollection>>} OK
   */
  async getInAppInboxUserTokens(
    userId: string,
    params?: GetInAppInboxUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<InboxTokenResponseCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/in_app/inbox/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxTokenResponseCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<InboxTokenResponseCollection>(request);
  }

  /**
   * Retrieves a specific in_app token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxTokenResponse>>} OK
   */
  async getInAppInboxUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<InboxTokenResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/in_app/inbox/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxTokenResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<InboxTokenResponse>(request);
  }

  /**
   * Revokes a specific user's in_app token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardInAppInboxUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/in_app/inbox/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsTokenCollection>>} OK
   */
  async getMobilePushApnsUserTokens(
    userId: string,
    params?: GetMobilePushApnsUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<ApnsTokenCollection>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ApnsToken>>} OK
   */
  async getMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: apnsTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<ApnsToken>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushApnsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoTokenCollection>>} OK
   */
  async getMobilePushExpoUserTokens(
    userId: string,
    params?: GetMobilePushExpoUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<ExpoTokenCollection>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<ExpoToken>>} OK
   */
  async getMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: expoTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<ExpoToken>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushExpoUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmTokenCollection>>} OK
   */
  async getMobilePushFcmUserTokens(
    userId: string,
    params?: GetMobilePushFcmUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<FcmTokenCollection>(request);
  }

  /**
   * Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<FcmToken>>} OK
   */
  async getMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: fcmTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<FcmToken>(request);
  }

  /**
   * Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushFcmUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackTokenCollection>>} OK
   */
  async getSlackUserTokens(
    userId: string,
    params?: GetSlackUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<SlackTokenCollection>(request);
  }

  /**
   * Retrieves a specific slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackToken>>} OK
   */
  async getSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<SlackToken>(request);
  }

  /**
   * Revokes a specific user's slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TeamsTokenCollection>>} OK
   */
  async getTeamsUserTokens(
    userId: string,
    params?: GetTeamsUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TeamsTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: teamsTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<TeamsTokenCollection>(request);
  }

  /**
   * Retrieves a specific teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TeamsToken>>} OK
   */
  async getTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TeamsToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: teamsTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<TeamsToken>(request);
  }

  /**
   * Revokes a specific user's teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
   * Lists all web_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.
   * @param {string} userId -
   * @param {number} [params.limit] -
   * @param {string} [params.startingAfter] -
   * @param {string} [params.endingBefore] -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebPushTokenCollection>>} OK
   */
  async getWebPushUserTokens(
    userId: string,
    params?: GetWebPushUserTokensParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushTokenCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushTokenCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'user_id',
        value: userId,
      })
      .addQueryParam({
        key: 'limit',
        value: params?.limit,
      })
      .addQueryParam({
        key: 'starting_after',
        value: params?.startingAfter,
      })
      .addQueryParam({
        key: 'ending_before',
        value: params?.endingBefore,
      })
      .build();
    return this.client.call<WebPushTokenCollection>(request);
  }

  /**
   * Retrieves a specific web_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebPushToken>>} OK
   */
  async getWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushToken>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushTokenResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
    return this.client.call<WebPushToken>(request);
  }

  /**
   * Revokes a specific user's web_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.
   * @param {string} userId -
   * @param {string} tokenId -
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: discardResultResponse,
        contentType: ContentType.Json,
        status: 200,
      })
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
