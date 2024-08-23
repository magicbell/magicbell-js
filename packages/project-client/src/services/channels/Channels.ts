import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer';
import { RequestBuilder } from '../../http/transport/request-builder';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { BaseService } from '../base-service';
import { ApnsTokenWithMetadata, apnsTokenWithMetadataResponse } from './models/apns-token-with-metadata';
import {
  ArrayWithMetadataOfApnsToken,
  arrayWithMetadataOfApnsTokenResponse,
} from './models/array-with-metadata-of-apns-token';
import {
  ArrayWithMetadataOfFcmToken,
  arrayWithMetadataOfFcmTokenResponse,
} from './models/array-with-metadata-of-fcm-token';
import {
  ArrayWithMetadataOfInboxToken,
  arrayWithMetadataOfInboxTokenResponse,
} from './models/array-with-metadata-of-inbox-token';
import {
  ArrayWithMetadataOfSlackToken,
  arrayWithMetadataOfSlackTokenResponse,
} from './models/array-with-metadata-of-slack-token';
import {
  ArrayWithMetadataOfTeamsToken,
  arrayWithMetadataOfTeamsTokenResponse,
} from './models/array-with-metadata-of-teams-token';
import {
  ArrayWithMetadataOfWebPushToken,
  arrayWithMetadataOfWebPushTokenResponse,
} from './models/array-with-metadata-of-web-push-token';
import { DiscardResult, discardResultResponse } from './models/discard-result';
import { FcmTokenWithMetadata, fcmTokenWithMetadataResponse } from './models/fcm-token-with-metadata';
import { InboxTokenWithMetadata, inboxTokenWithMetadataResponse } from './models/inbox-token-with-metadata';
import { SlackTokenWithMetadata, slackTokenWithMetadataResponse } from './models/slack-token-with-metadata';
import { TeamsTokenWithMetadata, teamsTokenWithMetadataResponse } from './models/teams-token-with-metadata';
import { WebPushTokenWithMetadata, webPushTokenWithMetadataResponse } from './models/web-push-token-with-metadata';

export class ChannelsService extends BaseService {
  /**
   *
   * @param {string} userId -
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfInboxToken>>} OK
   */
  async getInAppUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfInboxToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfInboxToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/in_app/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfInboxTokenResponse)
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
    return this.client.call<ArrayWithMetadataOfInboxToken>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<InboxTokenWithMetadata>>} OK
   */
  async getInAppUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<InboxTokenWithMetadata>> {
    const request = new RequestBuilder<InboxTokenWithMetadata>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/users/{user_id}/channels/in_app/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(inboxTokenWithMetadataResponse)
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
    return this.client.call<InboxTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} userId -
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardInAppUserToken(
    userId: string,
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('DELETE')
      .setPath('/users/{user_id}/channels/in_app/tokens/{token_id}')
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
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfApnsToken>>} OK
   */
  async getMobilePushApnsUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfApnsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfApnsToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfFcmToken>>} OK
   */
  async getMobilePushFcmUserTokens(
    userId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ArrayWithMetadataOfFcmToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfFcmToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
