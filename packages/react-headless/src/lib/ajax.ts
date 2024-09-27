import clientSettings from '../stores/clientSettings.js';

/**
 * Performs an ajax request to the MagicBell API server.
 *
 * @param method - the request method to be used when making the request
 * @param path - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
function sendAPIRequest(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
): Promise<unknown> {
  const client = clientSettings.getState().getClient();

  const stringParams = params
    ? Object.fromEntries<string>(Object.entries(params).map(([key, value]) => [key, String(value)]))
    : undefined;

  return client.request({
    method,
    path,
    data,
    params: stringParams,
  });
}

/**
 * Performs a GET request.
 *
 * @param url - the server URL that will be used for the request
 * @param params - the URL parameters to be sent with the request
 */
export function fetchAPI(url: string, params?: Record<string, unknown>) {
  return sendAPIRequest('GET', url, undefined, params);
}

/**
 * Performs a POST request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
export function postAPI(url: string, data?: Record<string, unknown>, params?: Record<string, unknown>) {
  return sendAPIRequest('POST', url, data, params);
}

/**
 * Performs a DELETE request.
 *
 * @param url - the server URL that will be used for the request
 * @param params - the URL parameters to be sent with the request
 */
export function deleteAPI(url: string, params?: Record<string, unknown>) {
  return sendAPIRequest('DELETE', url, undefined, params);
}

/**
 * Performs a PUT request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 * @returns - A promise.
 */
export function putAPI(url: string, data: Record<string, unknown>) {
  return sendAPIRequest('PUT', url, data);
}
