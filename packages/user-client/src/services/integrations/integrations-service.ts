import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import {
  WebPushTokenPayload,
  webPushTokenPayloadRequest,
  webPushTokenPayloadResponse,
} from '../common/web-push-token-payload.js';
import {
  InboxConfigPayload,
  inboxConfigPayloadRequest,
  inboxConfigPayloadResponse,
} from './models/inbox-config-payload.js';
import {
  SlackFinishInstallResponse,
  slackFinishInstallResponseRequest,
} from './models/slack-finish-install-response.js';
import { SlackInstallation, slackInstallationRequest, slackInstallationResponse } from './models/slack-installation.js';
import { SlackStartInstall, slackStartInstallRequest } from './models/slack-start-install.js';
import {
  SlackStartInstallResponseContent,
  slackStartInstallResponseContentResponse,
} from './models/slack-start-install-response-content.js';
import {
  TemplatesInstallation,
  templatesInstallationRequest,
  templatesInstallationResponse,
} from './models/templates-installation.js';
import {
  WebPushStartInstallationResponse,
  webPushStartInstallationResponseResponse,
} from './models/web-push-start-installation-response.js';

export class IntegrationsService extends BaseService {
  /**
   * Creates a new installation of a inbox integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigPayload>>} Created
   */
  async saveInboxInstallation(
    body: InboxConfigPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<InboxConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/inbox/installations')
      .setRequestSchema(inboxConfigPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<InboxConfigPayload>(request);
  }

  /**
   * Initiates the installation flow for a inbox integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<InboxConfigPayload>>} Created
   */
  async startInboxInstallation(requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfigPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/inbox/installations/start')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: inboxConfigPayloadResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<InboxConfigPayload>(request);
  }

  /**
   * Creates a new installation of a slack integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async saveSlackInstallation(
    body: SlackInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations')
      .setRequestSchema(slackInstallationRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackInstallationResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackInstallation>(request);
  }

  /**
   * Completes the installation flow for a slack integration. This endpoint is typically called after the user has completed any required authorization steps with slack.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async finishSlackInstallation(
    body: SlackFinishInstallResponse,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations/finish')
      .setRequestSchema(slackFinishInstallResponseRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackInstallationResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackInstallation>(request);
  }

  /**
   * Initiates the installation flow for a slack integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<SlackStartInstallResponseContent>>} Created
   */
  async startSlackInstallation(
    body: SlackStartInstall,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackStartInstallResponseContent>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations/start')
      .setRequestSchema(slackStartInstallRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: slackStartInstallResponseContentResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<SlackStartInstallResponseContent>(request);
  }

  /**
   * Creates a new installation of a templates integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<TemplatesInstallation>>} Created
   */
  async saveTemplatesInstallation(
    body: TemplatesInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TemplatesInstallation>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/templates/installations')
      .setRequestSchema(templatesInstallationRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: templatesInstallationResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<TemplatesInstallation>(request);
  }

  /**
   * Creates a new installation of a web_push integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebPushTokenPayload>>} Created
   */
  async saveWebPushInstallation(
    body: WebPushTokenPayload,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushTokenPayload>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/web_push/installations')
      .setRequestSchema(webPushTokenPayloadRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushTokenPayloadResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WebPushTokenPayload>(request);
  }

  /**
   * Initiates the installation flow for a web_push integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.
   * @param {RequestConfig} requestConfig - (Optional) The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WebPushStartInstallationResponse>>} Created
   */
  async startWebPushInstallation(
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushStartInstallationResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/web_push/installations/start')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: webPushStartInstallationResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<WebPushStartInstallationResponse>(request);
  }
}
