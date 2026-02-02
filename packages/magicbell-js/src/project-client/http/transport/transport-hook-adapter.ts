import { CustomHook } from '../hooks/custom-hook.js';
import { HttpError, HttpRequest } from '../hooks/hook.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { HttpResponse } from '../types.js';
import { Request } from './request.js';
import { RequestParameter } from './types.js';

/**
 * Adapter that bridges between the internal Request representation and the Hook interface.
 * Converts Request objects to HttpRequest format for hook processing, then converts
 * modified HttpRequest objects back to Request format.
 *
 * @template T - The expected response type
 */
export class TransportHookAdapter<T> {
  private hook: CustomHook = new CustomHook();

  /**
   * Invokes the custom hook before sending the request.
   * Converts the Request to HttpRequest format, calls the hook, then converts back.
   *
   * @param request - The internal Request object
   * @param params - Additional parameters to pass to the hook
   * @returns The modified Request after hook processing
   */
  public async beforeRequest(request: Request, params: Map<string, string>): Promise<Request> {
    const hookRequest = this.requestToHookRequest(request);

    const newRequest = await this.hook.beforeRequest(hookRequest, params);

    const newTransportRequest = request.copy({
      baseUrl: newRequest.baseUrl,
      method: newRequest.method,
      path: newRequest.path,
      body: newRequest.body,
      queryParams: this.hookParamsToTransportParams(newRequest.queryParams, request.queryParams, true),
      headers: this.hookParamsToTransportParams(newRequest.headers, request.headers, false),
      pathParams: this.hookParamsToTransportParams(newRequest.pathParams, request.headers, false),
    });

    return newTransportRequest;
  }

  /**
   * Invokes the custom hook after receiving a response.
   * Converts the Request to HttpRequest format and calls the hook with the response.
   *
   * @param request - The internal Request object
   * @param response - The HTTP response received
   * @param params - Additional parameters to pass to the hook
   * @returns The potentially modified response after hook processing
   */
  public async afterResponse(
    request: Request,
    response: HttpResponse<T>,
    params: Map<string, string>,
  ): Promise<HttpResponse<T>> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.afterResponse(hookRequest, response, params);
  }

  /**
   * Invokes the custom hook when an error occurs.
   * Converts the Request to HttpRequest format and calls the error hook.
   *
   * @param request - The internal Request object
   * @param response - The HTTP response that triggered the error
   * @param params - Additional parameters to pass to the hook
   * @returns The HttpError from the hook
   */
  public async onError(request: Request, response: HttpResponse<T>, params: Map<string, string>): Promise<HttpError> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.onError(hookRequest, response, params);
  }

  /**
   * Converts the internal Request representation to the hook's HttpRequest format.
   * Extracts parameter values from RequestParameter wrappers.
   *
   * @param request - The internal Request object
   * @returns An HttpRequest object for hook processing
   */
  private requestToHookRequest(request: Request): HttpRequest {
    const hookHeaders: Map<string, unknown> = new Map();
    request.headers.forEach((header, key) => {
      hookHeaders.set(key, header.value);
    });

    const hookQueryParams: Map<string, unknown> = new Map();
    request.queryParams.forEach((queryParam, key) => {
      hookQueryParams.set(key, queryParam.value);
    });

    const hookPathParams: Map<string, unknown> = new Map();
    request.pathParams.forEach((pathParam, key) => {
      hookPathParams.set(key, pathParam.value);
    });

    const hookRequest: HttpRequest = {
      baseUrl: request.baseUrl,
      method: request.method,
      path: request.path,
      headers: hookHeaders,
      body: request.body,
      queryParams: hookQueryParams,
      pathParams: hookPathParams,
    };
    return hookRequest;
  }

  /**
   * Converts hook parameter maps back to RequestParameter format.
   * Preserves serialization metadata from the original parameters.
   *
   * @template T - The parameter value type
   * @param hookParams - The parameter map from hook processing
   * @param originalTransportParams - The original RequestParameter map for metadata
   * @param encode - Whether to encode the parameters
   * @returns A map of RequestParameter objects for transport
   */
  private hookParamsToTransportParams<T>(
    hookParams: Map<string, unknown>,
    originalTransportParams: Map<string, RequestParameter>,
    encode: boolean,
  ): Map<string, RequestParameter> {
    const transportParams: Map<string, RequestParameter> = new Map();
    hookParams.forEach((hookParamValue, hookParamKey) => {
      const requestParam = originalTransportParams.get(hookParamKey);
      transportParams.set(hookParamKey, {
        key: hookParamKey,
        value: hookParamValue,
        encode: requestParam?.encode ?? false,
        style: requestParam?.style || SerializationStyle.NONE,
        explode: requestParam?.explode ?? false,
        isLimit: requestParam?.isLimit ?? false,
        isOffset: requestParam?.isOffset ?? false,
        isCursor: requestParam?.isCursor ?? false,
      });
    });
    return transportParams;
  }
}
