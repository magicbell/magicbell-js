type RequestOptions = {
  token: string;
  project: string;
  baseURL: string;
};

type Config = {
  user: { id: string; email?: string | null; external_id?: string | null; hmac?: string | null };
  project: { id: number; subdomain: string; api_key: string; vapid_public_key: string };
  website_push_id: string;
};

type Subscription = {
  created_at: string;
  device_token: string;
  discarded_at: string | null;
  id: string;
  platform: string;
  user_id: string;
};

let _config: Config | null = null;
let _cacheKey = '';

const api = {
  async getConfig({ token, project, baseURL }: RequestOptions) {
    const cacheKey = [token, project, baseURL].join('-');
    if (_config && _cacheKey === cacheKey) return _config;

    return fetch(`${baseURL}/web_push_subscriptions?access_token=${token}&project=${project}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((x) => x.json() as Promise<{ push_subscription: Config }>)
      .then((x) => {
        _config = x.push_subscription;
        _cacheKey = cacheKey;
        return _config;
      });
  },

  async getSubscriptions({ token, project, baseURL }: RequestOptions) {
    const config = await this.getConfig({ token, project, baseURL });
    if (!config.project.api_key) throw new Error('Missing API key');
    const headers: Record<string, string> = {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-magicbell-api-key': config.project.api_key,
    };
    if (config.user.email) {
      headers['x-magicbell-user-email'] = config.user.email;
    } else if (config.user.external_id) {
      headers['x-magicbell-user-external-id'] = config.user.external_id;
    }
    if (config.user.hmac) {
      headers['x-magicbell-user-hmac'] = config.user.hmac;
    }
    return fetch(`${baseURL}/push_subscriptions`, {
      method: 'GET',
      headers,
    })
      .then((result) => result.json())
      .then((result) => result?.push_subscriptions || []);
  },

  async updateSubscription({ token, project, baseURL }: RequestOptions, subscription: PushSubscriptionJSON) {
    return fetch(`${baseURL}/web_push_subscriptions?access_token=${token}&project=${project}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        web_push_subscription: {
          data: subscription,
        },
      }),
    })
      .then((x) => x.json() as Promise<{ web_push_subscription: { id: string } }>)
      .then((x) => x.web_push_subscription);
  },
};

export function isSupported() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return 'PushManager' in window && 'serviceWorker' in navigator;
}

export async function prefetchConfig(options: SubscribeOptions) {
  await api.getConfig({ ...options, baseURL: options.host || location.origin });
}

export async function registerServiceWorker({ path = '/sw.js' }: { path?: string } = {}) {
  // don't register a service-worker if there's already one
  if (navigator.serviceWorker.controller) return navigator.serviceWorker.ready;
  await navigator.serviceWorker.register(path);
  return navigator.serviceWorker.ready;
}

/**
 * Checks if the current user has an active push subscription that is registered by MagicBell.
 */
export async function isSubscribed(options: SubscribeOptions) {
  const baseURL = options.host || location.origin;
  const subscriptions = await api.getSubscriptions({ ...options, baseURL });
  const currentPushSubscriptionEndpoint = await navigator.serviceWorker?.ready
    .then((sw) => sw.pushManager.getSubscription())
    .then((x) => x?.endpoint);
  return (
    Boolean(currentPushSubscriptionEndpoint) &&
    subscriptions.some((subscription: Subscription) => subscription.device_token === currentPushSubscriptionEndpoint)
  );
}

type SubscribeOptions = {
  token: string;
  project: string;
  host?: string;
  serviceWorkerPath?: string;
};

/**
 * Request permission to send push notifications and post the subscription to the MagicBell API.
 */
export async function subscribe(options: SubscribeOptions) {
  if (!isSupported()) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const baseURL = options.host || location.origin;
  const config = await api.getConfig({ ...options, baseURL });
  const registration = await registerServiceWorker({ path: options.serviceWorkerPath });

  // remove active subscription if there's any
  const activeSubscription = await registration.pushManager.getSubscription();
  if (activeSubscription) {
    await activeSubscription.unsubscribe().catch(() => void 0);
  }

  // strip the base64 padding, it's either that or convert to uint8array
  const applicationServerKey = config.project.vapid_public_key.replace(/=/g, '');

  const subscription = await registration.pushManager
    .subscribe({ userVisibleOnly: true, applicationServerKey })
    .then((x) => x.toJSON());

  if (!('endpoint' in subscription)) {
    throw new Error('Failed to subscribe to push notifications, browser did not return an subscription endpoint.');
  }

  await api.updateSubscription({ ...options, baseURL }, subscription);
}
