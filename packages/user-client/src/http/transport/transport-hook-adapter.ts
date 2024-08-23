import { CustomHook } from '../hooks/custom-hook';
import { HttpError, HttpRequest } from '../hooks/hook';
import { SerializationStyle } from '../serialization/base-serializer';
import { HttpResponse } from '../types';
import { Request, RequestParameter } from './request';

export class TransportHookAdapter<T> {
  private hook: CustomHook = new CustomHook();

  public async beforeRequest(request: Request<T>, params: Map<string, string>): Promise<Request<T>> {
    const hookRequest = this.requestToHookRequest(request);

    const newRequest = await this.hook.beforeRequest(hookRequest, params);

    const newTransportRequest = request.copy({
      baseUrl: newRequest.baseUrl,
      method: newRequest.method,
      path: newRequest.path,
      body: newRequest.body,
      queryParams: this.hookParamsToTransportParams(newRequest.queryParams, request.queryParams, true),
      headers: this.hookParamsToTransportParams(newRequest.headers, request.headers, false),
    });

    return newTransportRequest;
  }

  public async afterResponse(
    request: Request<T>,
    response: HttpResponse<T>,
    params: Map<string, string>,
  ): Promise<HttpResponse<T>> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.afterResponse(hookRequest, response, params);
  }

  public async onError(
    request: Request<T>,
    response: HttpResponse<T>,
    params: Map<string, string>,
  ): Promise<HttpError> {
    const hookRequest = this.requestToHookRequest(request);
    return this.hook.onError(hookRequest, response, params);
  }

  private requestToHookRequest(request: Request<T>): HttpRequest {
    const hookHeaders: Map<string, unknown> = new Map();
    request.headers.forEach((header, key) => {
      hookHeaders.set(key, header.value);
    });

    const hookQueryParams: Map<string, unknown> = new Map();
    request.queryParams.forEach((queryParam, key) => {
      hookQueryParams.set(key, queryParam.value);
    });

    const hookRequest: HttpRequest = {
      baseUrl: request.baseUrl,
      method: request.method,
      path: request.path,
      headers: hookHeaders,
      body: request.body,
      queryParams: hookQueryParams,
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
      });
    });
    return transportParams;
  }
}
