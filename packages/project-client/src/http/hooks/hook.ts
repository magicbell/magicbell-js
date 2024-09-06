type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export interface HttpRequest {
  baseUrl: string;
  method: HttpMethod;
  path: string;
  headers: Map<string, unknown>;
  body?: BodyInit;
  abortSignal?: AbortSignal;
  queryParams: Map<string, unknown>;
}

interface HttpMetadata {
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpResponse<T> {
  data?: T;
  metadata: HttpMetadata;
  raw: ArrayBuffer;
}

export interface HttpError {
  error: string;
  metadata: HttpMetadata;
}

export interface Hook {
  beforeRequest(request: HttpRequest, params: Map<string, string>): Promise<HttpRequest>;

  afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpResponse<any>>;

  onError(request: HttpRequest, response: HttpResponse<any>, params: Map<string, string>): Promise<HttpError>;
}
