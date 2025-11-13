import { z } from 'zod';

import { Environment } from '../../http/environment.js';
import { ThrowableError } from '../../http/errors/throwable-error.js';
import { SerializationStyle } from '../../http/serialization/base-serializer.js';
import { RequestBuilder } from '../../http/transport/request-builder.js';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types.js';
import { BaseService } from '../base-service.js';
import { CreateRunResponse, createRunResponseResponse } from './models/create-run-response.js';
import { ExecuteWorkflowRequest, executeWorkflowRequestRequest } from './models/execute-workflow-request.js';
import { GetRunResponse, getRunResponseResponse } from './models/get-run-response.js';
import {
  WorkflowDefinition,
  workflowDefinitionRequest,
  workflowDefinitionResponse,
} from './models/workflow-definition.js';
import { WorkflowRunCollection, workflowRunCollectionResponse } from './models/workflow-run-collection.js';

export class WorkflowsService extends BaseService {
  /**
   * Creates or updates a workflow definition for the project
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WorkflowDefinition>>} - OK
   */
  async saveWorkflow(
    body: WorkflowDefinition,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WorkflowDefinition>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('PUT')
      .setPath('/workflows')
      .setRequestSchema(workflowDefinitionRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: workflowDefinitionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<WorkflowDefinition>(request);
  }

  /**
   * Retrieves a workflow definition by key
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WorkflowDefinition>>} - OK
   */
  async fetchWorkflow(requestConfig?: RequestConfig): Promise<HttpResponse<WorkflowDefinition>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/workflows/*')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: workflowDefinitionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();
    return this.client.call<WorkflowDefinition>(request);
  }

  /**
   * Executes a workflow with the provided input parameters
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<CreateRunResponse>>} - Created
   */
  async createWorkflowRun(
    body: ExecuteWorkflowRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<CreateRunResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/workflows/runs')
      .setRequestSchema(executeWorkflowRequestRequest)
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: createRunResponseResponse,
        contentType: ContentType.Json,
        status: 201,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();
    return this.client.call<CreateRunResponse>(request);
  }

  /**
   * Retrieves the status and details of a workflow run
   * @param {string} runId -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<GetRunResponse>>} - OK
   */
  async fetchWorkflowRun(runId: string, requestConfig?: RequestConfig): Promise<HttpResponse<GetRunResponse>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/workflows/runs/{run_id}')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: getRunResponseResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'run_id',
        value: runId,
      })
      .build();
    return this.client.call<GetRunResponse>(request);
  }

  /**
   * Retrieves all runs for a specific workflow
   * @param {string} workflowKey -
   * @param {RequestConfig} [requestConfig] - The request configuration for retry and validation.
   * @returns {Promise<HttpResponse<WorkflowRunCollection>>} - OK
   */
  async listWorkflowRuns(
    workflowKey: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<WorkflowRunCollection>> {
    const request = new RequestBuilder()
      .setBaseUrl(requestConfig?.baseUrl || this.config.baseUrl || this.config.environment || Environment.DEFAULT)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/workflows/{workflow_key}/runs')
      .setRequestSchema(z.any())
      .addAccessTokenAuth(this.config.token, 'Bearer')
      .setRequestContentType(ContentType.Json)
      .addResponse({
        schema: workflowRunCollectionResponse,
        contentType: ContentType.Json,
        status: 200,
      })
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addPathParam({
        key: 'workflow_key',
        value: workflowKey,
      })
      .build();
    return this.client.call<WorkflowRunCollection>(request);
  }
}
