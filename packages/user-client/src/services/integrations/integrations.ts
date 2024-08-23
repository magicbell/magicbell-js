import { z } from 'zod';

import { RequestBuilder } from '../../http/transport/request-builder';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { BaseService } from '../base-service';
import { InboxConfig, inboxConfigResponse } from './models/inbox-config';
import { SlackFinishInstallResponse, slackFinishInstallResponseRequest } from './models/slack-finish-install-response';
import { SlackInstallation, slackInstallationRequest, slackInstallationResponse } from './models/slack-installation';
import { SlackStartInstall, slackStartInstallRequest } from './models/slack-start-install';
import {
  TemplatesInstallation,
  templatesInstallationRequest,
  templatesInstallationResponse,
} from './models/templates-installation';
import {
  WebPushStartInstallationResponse,
  webPushStartInstallationResponseResponse,
} from './models/web-push-start-installation-response';

export class IntegrationsService extends BaseService {
  /**
   *
   * @returns {Promise<HttpResponse<InboxConfig>>} Created
   */
  async startInboxInstallation(requestConfig?: RequestConfig): Promise<HttpResponse<InboxConfig>> {
    const request = new RequestBuilder<InboxConfig>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async saveSlackInstallation(
    body: SlackInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder<SlackInstallation>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<SlackInstallation>>} Created
   */
  async finishSlackInstallation(
    body: SlackFinishInstallResponse,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<SlackInstallation>> {
    const request = new RequestBuilder<SlackInstallation>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<any>>} Created
   */
  async startSlackInstallation(
    body: SlackStartInstall,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<undefined>> {
    const request = new RequestBuilder<undefined>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
      .setMethod('POST')
      .setPath('/integrations/slack/installations/start')
      .setRequestSchema(slackStartInstallRequest)
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
   * @returns {Promise<HttpResponse<TemplatesInstallation>>} Created
   */
  async saveTemplatesInstallation(
    body: TemplatesInstallation,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<TemplatesInstallation>> {
    const request = new RequestBuilder<TemplatesInstallation>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
   *
   * @returns {Promise<HttpResponse<WebPushStartInstallationResponse>>} Created
   */
  async startWebPushInstallation(
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WebPushStartInstallationResponse>> {
    const request = new RequestBuilder<WebPushStartInstallationResponse>()
      .setConfig(this.config)
      .setBaseUrl(this.config)
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
