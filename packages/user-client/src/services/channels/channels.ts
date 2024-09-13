import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { WebPushToken, webPushTokenRequest, webPushTokenResponse } from '../common/web-push-token.js';
import { ApnsToken, apnsTokenRequest, apnsTokenResponse } from './models/apns-token.js';
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
import { DiscardResult, discardResultResponse } from './models/discard-result.js';
import { ExpoToken, expoTokenRequest, expoTokenResponse } from './models/expo-token.js';
import { ExpoTokenWithMetadata, expoTokenWithMetadataResponse } from './models/expo-token-with-metadata.js';
import { FcmToken, fcmTokenRequest, fcmTokenResponse } from './models/fcm-token.js';
import { FcmTokenWithMetadata, fcmTokenWithMetadataResponse } from './models/fcm-token-with-metadata.js';
import { SlackToken, slackTokenRequest, slackTokenResponse } from './models/slack-token.js';
import { SlackTokenWithMetadata, slackTokenWithMetadataResponse } from './models/slack-token-with-metadata.js';
import { TeamsToken, teamsTokenRequest, teamsTokenResponse } from './models/teams-token.js';
import { TeamsTokenWithMetadata, teamsTokenWithMetadataResponse } from './models/teams-token-with-metadata.js';
import { WebPushTokenWithMetadata, webPushTokenWithMetadataResponse } from './models/web-push-token-with-metadata.js';

export class ChannelsService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfApnsToken>>} OK
   */
  async getMobilePushApnsTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfApnsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfApnsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfApnsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfApnsToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ApnsToken>>} Created
   */
  async saveMobilePushApnsToken(body: ApnsToken, requestConfig?: RequestConfig): Promise<HttpResponse<ApnsToken>> {
    const request = new RequestBuilder<ApnsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/apns/tokens')
      .setRequestSchema(apnsTokenRequest)
      .setResponseSchema(apnsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ApnsToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ApnsTokenWithMetadata>>} OK
   */
  async getMobilePushApnsToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ApnsTokenWithMetadata>> {
    const request = new RequestBuilder<ApnsTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(apnsTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ApnsTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushApnsToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/apns/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfExpoToken>>} OK
   */
  async getMobilePushExpoTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfExpoToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfExpoToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfExpoTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfExpoToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ExpoToken>>} Created
   */
  async saveMobilePushExpoToken(body: ExpoToken, requestConfig?: RequestConfig): Promise<HttpResponse<ExpoToken>> {
    const request = new RequestBuilder<ExpoToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/expo/tokens')
      .setRequestSchema(expoTokenRequest)
      .setResponseSchema(expoTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<ExpoToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<ExpoTokenWithMetadata>>} OK
   */
  async getMobilePushExpoToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<ExpoTokenWithMetadata>> {
    const request = new RequestBuilder<ExpoTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(expoTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<ExpoTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushExpoToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/expo/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfFcmToken>>} OK
   */
  async getMobilePushFcmTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfFcmToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfFcmToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfFcmTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfFcmToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<FcmToken>>} Created
   */
  async saveMobilePushFcmToken(body: FcmToken, requestConfig?: RequestConfig): Promise<HttpResponse<FcmToken>> {
    const request = new RequestBuilder<FcmToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/mobile_push/fcm/tokens')
      .setRequestSchema(fcmTokenRequest)
      .setResponseSchema(fcmTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<FcmToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<FcmTokenWithMetadata>>} OK
   */
  async getMobilePushFcmToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<FcmTokenWithMetadata>> {
    const request = new RequestBuilder<FcmTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(fcmTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<FcmTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardMobilePushFcmToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/mobile_push/fcm/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfSlackToken>>} OK
   */
  async getSlackTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfSlackToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfSlackToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfSlackTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfSlackToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<SlackToken>>} Created
   */
  async saveSlackToken(body: SlackToken, requestConfig?: RequestConfig): Promise<HttpResponse<SlackToken>> {
    const request = new RequestBuilder<SlackToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/slack/tokens')
      .setRequestSchema(slackTokenRequest)
      .setResponseSchema(slackTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<SlackTokenWithMetadata>>} OK
   */
  async getSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<SlackTokenWithMetadata>> {
    const request = new RequestBuilder<SlackTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(slackTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<SlackTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardSlackToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/slack/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfTeamsToken>>} OK
   */
  async getTeamsTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfTeamsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfTeamsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfTeamsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfTeamsToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<TeamsToken>>} Created
   */
  async saveTeamsToken(body: TeamsToken, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsToken>> {
    const request = new RequestBuilder<TeamsToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(teamsTokenRequest)
      .setResponseSchema(teamsTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<TeamsToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<TeamsTokenWithMetadata>>} OK
   */
  async getTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsTokenWithMetadata>> {
    const request = new RequestBuilder<TeamsTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(teamsTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<TeamsTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/teams/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfWebPushToken>>} OK
   */
  async getWebPushTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfWebPushToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfWebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfWebPushTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfWebPushToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<WebPushToken>>} Created
   */
  async saveWebPushToken(body: WebPushToken, requestConfig?: RequestConfig): Promise<HttpResponse<WebPushToken>> {
    const request = new RequestBuilder<WebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/channels/web_push/tokens')
      .setRequestSchema(webPushTokenRequest)
      .setResponseSchema(webPushTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WebPushToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<WebPushTokenWithMetadata>>} OK
   */
  async getWebPushToken(
    tokenId: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushTokenWithMetadata>> {
    const request = new RequestBuilder<WebPushTokenWithMetadata>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(webPushTokenWithMetadataResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<WebPushTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardWebPushToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('DELETE')
      .setPath('/channels/web_push/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(discardResultResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'token_id',
        value: tokenId,
      })
      .build();
    return this.client.call<DiscardResult>(request);
  }
}
