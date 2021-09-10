import axios from 'axios';

interface ServerResponse {
  data: any;
}

export const api = axios.create({ baseURL: 'https://api.magicbell.com' });

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

/**
 * Performs an ajax request using `fetch`.
 *
 * @param method - the request method to be used when making the request
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param customParams - the URL parameters to be sent with the request
 */
function sendAPIRequest(method: AxiosMethod, url: string, data: any | null, params: any | null) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return api({
    method,
    url,
    data,
    params,
    headers,
    baseURL: api.defaults.baseURL,
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
  return sendAPIRequest('get', url, null, params);
}

/**
 * Performs a POST request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
export function postAPI(url: string, data: any = {}, params = {}) {
  return sendAPIRequest('post', url, data, params);
}

/**
 * Performs a DELETE request.
 *
 * @param url - the server URL that will be used for the request
 * @param params - the URL parameters to be sent with the request
 */
export function deleteAPI(url: string, params = {}) {
  return sendAPIRequest('delete', url, null, params);
}

/**
 * Performs a PUT request.
 *
 * @param url - the server URL that will be used for the request
 * @param data - the data to be sent as the request body
 * @param params - the URL parameters to be sent with the request
 */
export function putAPI(url: string, data: any, params = {}) {
  return sendAPIRequest('put', url, data, params);
}

/**
 * Sets the default headers for all requests.
 *
 * @param apiKey API key of your MagicBell project
 * @param userEmail Email of the user whose notifications will be displayed
 * @param userExternalId External ID of the user you want to fetch notifications for
 * @param userKey Computed HMAC of the user whose notifications will be displayed, compute this with the secret of the magicbell project
 * @param apiSecret API secret of your MagicBell project (required to create notifications)
 */
export function setupAjax(options: {
  apiKey: string;
  userEmail?: string;
  userExternalId?: string;
  userKey?: string;
  apiSecret?: string;
  baseURL?: string;
}) {
  const { apiKey, userEmail, userExternalId, userKey, apiSecret, baseURL } = options;

  if (baseURL) api.defaults.baseURL = baseURL;
  api.defaults.headers = {
    'X-MAGICBELL-API-KEY': apiKey,
    'X-MAGICBELL-CLIENT-ID': Math.random().toString(36).substring(2) + Date.now(),
  };

  if (userEmail) api.defaults.headers['X-MAGICBELL-USER-EMAIL'] = userEmail;
  if (userExternalId) api.defaults.headers['X-MAGICBELL-USER-EXTERNAL-ID'] = userExternalId;
  if (userKey) api.defaults.headers['X-MAGICBELL-USER-HMAC'] = userKey;
  if (apiSecret) api.defaults.headers['X-MAGICBELL-API-SECRET'] = apiSecret;
}
