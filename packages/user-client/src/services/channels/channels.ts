import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { BaseService } from '../base-service';
import { ApnsToken, apnsTokenRequest, apnsTokenResponse } from './models/apns-token';
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
import { FcmToken, fcmTokenRequest, fcmTokenResponse } from './models/fcm-token';
import { FcmTokenWithMetadata, fcmTokenWithMetadataResponse } from './models/fcm-token-with-metadata';
import { InboxToken, inboxTokenRequest, inboxTokenResponse } from './models/inbox-token';
import { InboxTokenWithMetadata, inboxTokenWithMetadataResponse } from './models/inbox-token-with-metadata';
import { SlackToken, slackTokenRequest, slackTokenResponse } from './models/slack-token';
import { SlackTokenWithMetadata, slackTokenWithMetadataResponse } from './models/slack-token-with-metadata';
import { TeamsTokenWithMetadata, teamsTokenWithMetadataResponse } from './models/teams-token-with-metadata';
import { WebPushToken, webPushTokenRequest, webPushTokenResponse } from './models/web-push-token';
import { WebPushTokenWithMetadata, webPushTokenWithMetadataResponse } from './models/web-push-token-with-metadata';

export class ChannelsService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfInboxToken>>} OK
   */
  async getInAppTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfInboxToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfInboxToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/channels/in_app/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(arrayWithMetadataOfInboxTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<ArrayWithMetadataOfInboxToken>(request);
  }

  /**
   *
   * @returns {Promise<HttpResponse<InboxToken>>} Created
   */
  async saveInAppToken(body: InboxToken, requestConfig?: RequestConfig): Promise<HttpResponse<InboxToken>> {
    const request = new RequestBuilder<InboxToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('POST')
      .setPath('/channels/in_app/tokens')
      .setRequestSchema(inboxTokenRequest)
      .setResponseSchema(inboxTokenResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<InboxToken>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<InboxTokenWithMetadata>>} OK
   */
  async getInAppToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<InboxTokenWithMetadata>> {
    const request = new RequestBuilder<InboxTokenWithMetadata>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('GET')
      .setPath('/channels/in_app/tokens/{token_id}')
      .setRequestSchema(z.any())
      .setResponseSchema(inboxTokenWithMetadataResponse)
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
    return this.client.call<InboxTokenWithMetadata>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<DiscardResult>>} OK
   */
  async discardInAppToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<DiscardResult>> {
    const request = new RequestBuilder<DiscardResult>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('DELETE')
      .setPath('/channels/in_app/tokens/{token_id}')
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
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfApnsToken>>} OK
   */
  async getMobilePushApnsTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfApnsToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfApnsToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   * @returns {Promise<HttpResponse<ArrayWithMetadataOfFcmToken>>} OK
   */
  async getMobilePushFcmTokens(requestConfig?: RequestConfig): Promise<HttpResponse<ArrayWithMetadataOfFcmToken>> {
    const request = new RequestBuilder<ArrayWithMetadataOfFcmToken>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   * @returns {Promise<HttpResponse<any>>} Created
   */
  async saveTeamsToken(body: any, requestConfig?: RequestConfig): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('POST')
      .setPath('/channels/teams/tokens')
      .setRequestSchema(z.any())
      .setResponseSchema(z.undefined())
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<undefined>(request);
  }

  /**
   *
   * @param {string} tokenId -
   * @returns {Promise<HttpResponse<TeamsTokenWithMetadata>>} OK
   */
  async getTeamsToken(tokenId: string, requestConfig?: RequestConfig): Promise<HttpResponse<TeamsTokenWithMetadata>> {
    const request = new RequestBuilder<TeamsTokenWithMetadata>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
