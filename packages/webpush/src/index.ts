import { ClientOptions, IntegrationClient } from './internal/client';

export type Installation = {
  public_key: string;
  auth_token: string;
};

export type Token = {
  id: string;
  created_at: string;
  updated_at: string;
  discarded_at: string | null;
  endpoint?: string;
  keys?: Record<string, string>;
};

export type WebPushClientOptions = ClientOptions & { serviceWorkerPath?: string };

export class WebPushClient extends IntegrationClient<Installation, Token> {
  #serviceWorkerPath: string;

  constructor(options: WebPushClientOptions) {
    super('web_push', options);
    this.#serviceWorkerPath = options.serviceWorkerPath || '/sw.js';
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
    const subscriptions = await this.getTokens();
    const registration = await this.#getServiceWorker();
    const activeSubscription = await registration?.pushManager?.getSubscription();

    if (!activeSubscription?.endpoint) return false;
    return subscriptions
      .filter((x) => !x.discarded_at)
      .some((subscription) => {
        return subscription.endpoint === activeSubscription.endpoint;
      });
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

    // remove active subscription if there's any
    await this.unsubscribe();

    const config = await this.startInstallation();

    // strip the base64 padding, it's either that or convert to uint8array
    const applicationServerKey = config.public_key.replace(/=/g, '');

    const subscription = await registration.pushManager
      .subscribe({ userVisibleOnly: true, applicationServerKey })
      .then((x) => x.toJSON());

    if (!('endpoint' in subscription)) {
      throw new Error('Failed to subscribe to push notifications, browser did not return an subscription endpoint.');
    }

    await this.createToken(subscription);
  }

  async unsubscribe(): Promise<void> {
    const registration = await this.#getServiceWorker();
    if (!registration?.pushManager) return;

    const activeSubscription = await registration.pushManager.getSubscription();
    if (!activeSubscription) return;

    const endpoint = activeSubscription.endpoint;

    // we're just purging an old subscription, MagicBell backend will also do that on the next broadcast
    // so any error here, is non-critical
    void this.getTokens()
      .then((tokens: Token[]) => {
        const token = tokens.find((token) => token.endpoint === endpoint);
        if (!token) return;
        return this.deleteToken(token.id);
      })
      .catch(() => void 0);

    await activeSubscription.unsubscribe().catch(() => void 0);
  }

  async getAuthToken(): Promise<string> {
    const installation = await this.startInstallation();
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
