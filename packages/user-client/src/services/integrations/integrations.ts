import { z } from 'zod';

import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { WebPushToken, webPushTokenRequest, webPushTokenResponse } from '../common/web-push-token.js';
import { InboxConfig, inboxConfigRequest, inboxConfigResponse } from './models/inbox-config.js';
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
   * @returns {Promise<HttpResponse<InboxConfig>>} Created
   */
  async saveInboxInstallation(body: InboxConfig, requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfig>> {
    const request = new RequestBuilder<InboxConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/inbox/installations')
      .setRequestSchema(inboxConfigRequest)
      .setResponseSchema(inboxConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<InboxConfig>(request);
  }

  /**
   * Initiates the installation flow for a inbox integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.
   * @returns {Promise<HttpResponse<InboxConfig>>} Created
   */
  async startInboxInstallation(requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfig>> {
    const request = new RequestBuilder<InboxConfig>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/inbox/installations/start')
      .setRequestSchema(z.any())
      .setResponseSchema(inboxConfigResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<InboxConfig>(request);
  }

  /**
   * Creates a new installation of a slack integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async saveSlackInstallation(
    body: SlackInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder<SlackInstallation>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations')
      .setRequestSchema(slackInstallationRequest)
      .setResponseSchema(slackInstallationResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async finishSlackInstallation(
    body: SlackFinishInstallResponse,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder<SlackInstallation>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations/finish')
      .setRequestSchema(slackFinishInstallResponseRequest)
      .setResponseSchema(slackInstallationResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<SlackStartInstallResponseContent>>} Created
   */
  async startSlackInstallation(
    body: SlackStartInstall,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackStartInstallResponseContent>> {
    const request = new RequestBuilder<SlackStartInstallResponseContent>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations/start')
      .setRequestSchema(slackStartInstallRequest)
      .setResponseSchema(slackStartInstallResponseContentResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<TemplatesInstallation>>} Created
   */
  async saveTemplatesInstallation(
    body: TemplatesInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TemplatesInstallation>> {
    const request = new RequestBuilder<TemplatesInstallation>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/templates/installations')
      .setRequestSchema(templatesInstallationRequest)
      .setResponseSchema(templatesInstallationResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
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
   * @returns {Promise<HttpResponse<WebPushToken>>} Created
   */
  async saveWebPushInstallation(
    body: WebPushToken,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushToken>> {
    const request = new RequestBuilder<WebPushToken>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/web_push/installations')
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
   * Initiates the installation flow for a web_push integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.
   * @returns {Promise<HttpResponse<WebPushStartInstallationResponse>>} Created
   */
  async startWebPushInstallation(
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushStartInstallationResponse>> {
    const request = new RequestBuilder<WebPushStartInstallationResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/integrations/web_push/installations/start')
      .setRequestSchema(z.any())
      .setResponseSchema(webPushStartInstallationResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<WebPushStartInstallationResponse>(request);
  }
}
