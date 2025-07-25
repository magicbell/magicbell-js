import { type Notification, Client } from './user-client.js';

export class Realtime {
  #client: Client;
  #socketUrl = 'wss://ws.magicbell.com';
  #inboxToken: string | undefined;
  #origin: string | undefined;
  #websocket: WebSocket | undefined;
  #isConnected = false;
  #reconnectAttempts = 0;
  #maxReconnectAttempts = 5;
  #reconnectInterval = 1000;
  #notificationHandler: ((notification: Notification) => void) | undefined;

  constructor(options: { token: string } | Client) {
    if (options instanceof Client) {
      this.#client = options;
    } else {
      this.#client = new Client({ token: options.token });
    }
  }

  async listen(onNotification: (notification: Notification) => void) {
    this.#notificationHandler = onNotification;

    if (this.#websocket && this.#isConnected) {
      console.warn('Already connected to WebSocket');
      return;
    }

    try {
      const url = await this.#getUrl();
      this.#websocket = new WebSocket(url);

      this.#websocket.onopen = () => {
        this.#isConnected = true;
        this.#reconnectAttempts = 0;
        this.#reconnectInterval = 1000;
      };

      this.#websocket.onmessage = (event) => {
        if (event.origin !== this.#origin) return;

        try {
          const data = JSON.parse(event.data);
          this.#handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.#websocket.onclose = (event) => {
        console.warn('WebSocket disconnected:', event.code, event.reason);
        this.#isConnected = false;
        this.#handleReconnect();
      };

      this.#websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.#isConnected = false;
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.#handleReconnect();
    }
  }

  disconnect() {
    if (this.#websocket) {
      this.#websocket.close();
      this.#websocket = undefined;
    }
    this.#isConnected = false;
    this.#reconnectAttempts = 0;
  }

  isListening() {
    return this.#isConnected;
  }

  #handleMessage(data: any) {
    if (!this.#isNewNotificationMessage(data)) {
      return;
    }

    this.#handleNewNotification(data.data.id);
  }

  #isNewNotificationMessage(data: any): data is { name: 'notifications/new'; data: { id: string } } {
    return (
      typeof data === 'object' &&
      data !== null &&
      data.name === 'notifications/new' &&
      typeof data.data === 'object' &&
      data.data !== null &&
      typeof data.data.id === 'string'
    );
  }

  async #handleNewNotification(notificationId: string) {
    if (!this.#notificationHandler) {
      console.warn('No notification handler provided');
      return;
    }

    try {
      const { data: notification, metadata: res } = await this.#client.notifications.fetchNotification(notificationId);

      if (!isOK(res)) {
        console.error(`Failed to fetch notification ${notificationId}: ${res.status} ${res.statusText}`);
        return;
      }

      if (notification) {
        this.#notificationHandler(notification);
      }
    } catch (error) {
      console.error(`Error fetching notification ${notificationId}:`, error);
    }
  }

  #handleReconnect() {
    if (this.#reconnectAttempts >= this.#maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    if (!this.#notificationHandler) {
      console.warn('No notification handler, skipping reconnect');
      return;
    }

    setTimeout(() => {
      this.#reconnectAttempts++;
      this.#reconnectInterval = Math.min(this.#reconnectInterval * 2, 30000); // Max 30 seconds
      this.listen(this.#notificationHandler!);
    }, this.#reconnectInterval);
  }

  async #getUrl() {
    const jwtToken = this.#client.config.token;
    invariant(jwtToken, 'Failed to get token from client');
    const apiKey = getApiKeyFromToken(jwtToken);
    invariant(apiKey, 'Failed to get API key from token');

    const token = await this.#getToken();
    const url = new URL(this.#socketUrl);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('token', token);

    this.#origin = url.origin;
    return url.toString();
  }

  async #getToken() {
    if (this.#inboxToken) return this.#inboxToken;

    const { data, metadata: res } = await this.#client.channels.saveInboxToken({
      token: getSessionId(),
    });

    invariant(isOK(res), `Failed to save Inbox token: ${res.status} ${res.statusText}`);
    invariant(data?.token, 'Unexpected server response, missing token');

    this.#inboxToken = data.token;
    return data.token;
  }
}

function isOK(response: { status: number }) {
  return response.status >= 200 && response.status < 300;
}

function invariant(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function getSessionId() {
  if (typeof sessionStorage === 'undefined') {
    return generateID(64);
  }

  // sessionStorage gets cleared when the page session ends. A page
  // session lasts for as long as the browser is open and survives
  // over page reloads and restores. Opening a page in a new tab or
  // window will cause a new session to be initiated. This gives us
  // a stable ID per tab, and different ID's across tabs.
  const stored = sessionStorage.getItem('magicbell--realtime-token');
  if (stored) return stored;

  const id = generateID(64);
  sessionStorage.setItem('magicbell--realtime-token', id);
  return id;
}

function generateID(length = 17) {
  let id = '';

  while (id.length < length) {
    id += getRandomValues();
  }

  return id.substring(0, length);
}

function getApiKeyFromToken(token: string) {
  const data = getTokenPayload(token);
  if (!data) return null;

  if (data.api_key) {
    return data.api_key;
  }

  return null;
}

function getTokenPayload(token: string) {
  try {
    const [_, payload] = token.split('.');
    const data = JSON.parse(atob(payload));
    return data || null;
  } catch {
    return null;
  }
}

const getRandomValues =
  typeof crypto !== 'undefined' && crypto.getRandomValues
    ? () => crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
    : () => Math.random().toString(36).substring(2, 15);
