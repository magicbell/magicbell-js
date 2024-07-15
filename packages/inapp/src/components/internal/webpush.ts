import { type SaveWebPushTokenRequest, Client } from '@magicbell/user-client';

export type WebPushClientOptions = {
  serviceWorkerPath?: string;
  accessToken?: string;
};

export class WebPushClient {
  #serviceWorkerPath: string;
  #client: Client;

  constructor(options?: WebPushClientOptions) {
    this.#serviceWorkerPath = options?.serviceWorkerPath || '/sw.js';
    this.#client = new Client({ accessToken: options?.accessToken });
  }

  /**
   * Sets the access token used to authenticate.
   * @param {string} accessToken
   */
  setAccessToken(accessToken: string) {
    this.#client.setAccessToken(accessToken);
  }

  /**
   * Gets the registered service worker, and attempts to create one if no registration exists
   */
  async #getServiceWorker() {
    return registerServiceWorker(this.#serviceWorkerPath);
  }

  /**
   * Checks if the current user has an active push subscription that is registered by MagicBell.
   */
  async isSubscribed(): Promise<boolean> {
    const tokens = await this.#client.channels.getWebPushTokens();
    const registration = await this.#getServiceWorker();
    const activeSubscription = await registration?.pushManager?.getSubscription();

    if (!activeSubscription?.endpoint) return false;
    return (
      tokens.data
        ?.filter((x) => !x.metadata?.discarded_at)
        .some((subscription) => {
          return subscription.data?.endpoint === activeSubscription.endpoint;
        }) ?? false
    );
  }

  /**
   * Request permission to send push notifications and post the subscription to the MagicBell API.
   */
  async subscribe(): Promise<void> {
    if (!isSupported()) {
      throw new Error('Push notifications are not supported in this browser');
    }

    const registration = await this.#getServiceWorker();
    if (!registration?.pushManager) {
      throw new Error('Push notifications are not supported in this browser');
    }

    // remove active subscription if there is one
    await this.unsubscribe();

    const config = await this.#client.integrations.startWebPushInstallation({});
    // strip the base64 padding, it's either that or convert to uint8array
    const applicationServerKey = config.public_key.replace(/=/g, '');

    const subscription = await registration.pushManager
      .subscribe({ userVisibleOnly: true, applicationServerKey })
      .then((x) => x.toJSON());

    if (!subscription.endpoint) {
      throw new Error('Failed to subscribe to push notifications, browser did not return an subscription endpoint.');
    }

    await this.#client.channels.saveWebPushToken(subscription as unknown as SaveWebPushTokenRequest);
  }

  async unsubscribe(): Promise<void> {
    const registration = await this.#getServiceWorker();
    if (!registration?.pushManager) return;

    const activeSubscription = await registration.pushManager.getSubscription();
    if (!activeSubscription) return;

    const endpoint = activeSubscription.endpoint;

    // we're just purging an old subscription, MagicBell backend will also do that on the next broadcast
    // so any error here, is non-critical
    void this.#client.channels
      .getWebPushTokens()
      .then(({ data }) => {
        const token = data?.find((token) => token.data?.endpoint === endpoint);
        if (!token) return;
        return this.#client.channels.discardWebPushToken(String(token.metadata?.id));
      })
      .catch(() => void 0);

    await activeSubscription.unsubscribe().catch(() => void 0);
  }

  async getAuthToken(): Promise<string> {
    const installation = await this.#client.integrations.startWebPushInstallation({});
    return installation.auth_token;
  }
}

/**
 * Check if service workers and push notifications are supported in this browser
 */
export function isSupported() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return 'PushManager' in window && 'serviceWorker' in navigator;
}

/**
 * Gets the registered service worker, and attempts to create one if no registration exists
 */
export async function registerServiceWorker(options?: { path?: string } | string) {
  const scriptUrl = (typeof options === 'string' ? options : options?.path) || '/sw.js';

  // don't register a service-worker if there's already one
  if (navigator.serviceWorker.controller) return navigator.serviceWorker.ready;
  await navigator.serviceWorker.register(scriptUrl);
  return navigator.serviceWorker.ready;
}
