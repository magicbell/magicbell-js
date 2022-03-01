import axios from 'axios';

import clientSettings from '../stores/clientSettings';
import { registry } from './registry';

interface ServerResponse {
  data: unknown;
}

type AxiosMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export function buildAPIHeaders() {
  const { apiKey, apiSecret, clientId, userEmail, userExternalId, userKey } = clientSettings.getState();
  const headers = {
    'X-MAGICBELL-CLIENT-ID': clientId,
    'X-MAGICBELL-API-KEY': apiKey,
  };

  if (apiSecret) headers['X-MAGICBELL-API-SECRET'] = apiSecret;
  if (userEmail) headers['X-MAGICBELL-USER-EMAIL'] = userEmail;
  if (userKey) headers['X-MAGICBELL-USER-HMAC'] = userKey;
  if (userExternalId) headers['X-MAGICBELL-USER-EXTERNAL-ID'] = userExternalId;

  return headers;
}

/**
 * Performs an ajax request to the MagicBell API server.
 *
 * @param method - the request method to be used when making the request
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 * @param headers - the custom headers to be sent with the request
 */
function sendAPIRequest(
  method: AxiosMethod,
  url: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
) {
  const { serverURL } = clientSettings.getState();
  const headers = buildAPIHeaders();

  // get axios from the registry, to allow for mocking and use of interceptors
  const client = registry.get('axios', axios);

  return client({
    method,
    url,
    data,
    params,
    headers,
    baseURL: serverURL,
  }).then(
    (response: ServerResponse) => response.data,
    (error: Error) => {
      throw error;
    },
  );
}

/**
 * Performs a GET request.
 *
 * @param url - the server URL that will be used for the request
 * @param params - the URL parameters to be sent with the request
 */
export function fetchAPI(url: string, params = {}) {
  return sendAPIRequest('get', url, undefined, params);
}

/**
 * Performs a POST request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
export function postAPI(url: string, data: Record<string, unknown> = {}, params = {}) {
  return sendAPIRequest('post', url, data, params);
}

/**
 * Performs a DELETE request.
 *
 * @param url - the server URL that will be used for the request
 * @param params - the URL parameters to be sent with the request
 */
export function deleteAPI(url: string, params = {}) {
  return sendAPIRequest('delete', url, undefined, params);
}

/**
 * Performs a PUT request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
export function putAPI(url: string, data: Record<string, unknown>, params = {}) {
  return sendAPIRequest('put', url, data, params);
}
