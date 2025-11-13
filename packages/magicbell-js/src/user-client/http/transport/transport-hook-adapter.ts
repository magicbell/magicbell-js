import { CustomHook } from '../hooks/custom-hook.js';
import { HttpError, HttpRequest } from '../hooks/hook.js';
import { SerializationStyle } from '../serialization/base-serializer.js';
import { HttpResponse } from '../types.js';
import { Request } from './request.js';
import { RequestParameter } from './types.js';

export class TransportHookAdapter<T> {
  private hook: CustomHook = new CustomHook();

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

  public async afterResponse(
    request: Request,
    response: HttpResponse<T>,
    params: Map<string, string>,
  ): Promise<HttpResponse<T>> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.afterResponse(hookRequest, response, params);
  }

  public async onError(request: Request, response: HttpResponse<T>, params: Map<string, string>): Promise<HttpError> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.onError(hookRequest, response, params);
  }

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
