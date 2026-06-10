/**
 * Standard HTTP methods supported by the SDK.
 */
type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';

/**
 * Represents an HTTP request with all its components.
 */
export interface HttpRequest {
  /** Base URL of the API endpoint */
  baseUrl: string;
  /** HTTP method for the request */
  method: HttpMethod;
  /** Request path (relative to base URL) */
  path: string;
  /** Request headers as key-value pairs */
  headers: Map<string, unknown>;
  /** Request body payload (optional) */
  body?: BodyInit;
  /** Signal to abort the request (optional) */
  abortSignal?: AbortSignal;
  /** Query string parameters */
  queryParams: Map<string, unknown>;
  /** Path parameters for URL templating */
  pathParams: Map<string, unknown>;
}

/**
 * Metadata about an HTTP response.
 */
interface HttpMetadata {
  /** HTTP status code */
  status: number;
  /** HTTP status text message */
  statusText: string;
  /** Response headers as key-value pairs */
  headers: Record<string, string>;
}

/**
 * Represents an HTTP response with typed data.
 * @template T - The type of the response data
 */
export interface HttpResponse<T> {
  /** Parsed response data (optional) */
  data?: T;
  /** Response metadata (status, headers, etc.) */
  metadata: HttpMetadata;
  /** Raw response object from the HTTP client */
  raw: ArrayBuffer;
}

/**
 * Represents an HTTP error response.
 */
export interface HttpError {
  /** Error message or description */
  error: string;
  /** Response metadata (status, headers, etc.) */
  metadata: HttpMetadata;
}

/**
 * Hook interface for intercepting and modifying HTTP requests and responses.
 * Allows custom logic to be executed at different stages of the request lifecycle.
 */
export interface Hook {
  /**
   * Called before an HTTP request is sent.
   * Allows modification of the request before execution.
   * @param request - The HTTP request to be sent
   * @param params - Additional custom parameters
   * @returns A promise that resolves to the potentially modified request
   */
  beforeRequest(request: HttpRequest, params: Map<string, string>): Promise<HttpRequest>;

  /**
   * Called after a successful HTTP response is received.
   * Allows processing or modification of the response.
   * @param request - The original HTTP request
   * @param response - The HTTP response received
   * @param params - Additional custom parameters
   * @returns A promise that resolves to the potentially modified response
   */
  afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpResponse<any>>;

  /**
   * Called when an HTTP request results in an error.
   * Allows custom error handling and transformation.
   * @param request - The original HTTP request
   * @param response - The error response received
   * @param params - Additional custom parameters
   * @returns A promise that resolves to an error object
   */
  onError(request: HttpRequest, response: HttpResponse<any>, params: Map<string, string>): Promise<HttpError>;
}
