type RequestOptions = {
  token: string;
  project: string;
  baseURL: string;
};

type Config = {
  user: { id: string; email?: string | null; external_id?: string | null; hmac?: string | null };
  project: { id: number; subdomain: string; api_key: string; vapid_public_key: string };
  website_push_id: string;
  baseURL: string;
  safariPushURL: string;
  serviceWorkerPath?: string;
};

type PushSubscription = Omit<Config, 'baseURL' | 'safariPushURL'>;

let _config: (PushSubscription & Pick<Config, 'safariPushURL' | 'baseURL'>) | null = null;
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
      .then((x) => x.json() as Promise<{ push_subscription: PushSubscription }>)
      .then((x) => {
        _config = { ...x.push_subscription, baseURL, safariPushURL: `${baseURL}/safari/push` };
        _cacheKey = cacheKey;
        return _config;
      });
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
  return ('PushManager' in window && 'serviceWorker' in navigator) || 'safari' in window;
}

export async function registerServiceWorker({ path = '/sw.js' }: { path?: string } = {}) {
  // don't register a service-worker if there's already one
  if (navigator.serviceWorker.controller) return navigator.serviceWorker.ready;
  await navigator.serviceWorker.register(path);
  return navigator.serviceWorker.ready;
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
  const requestOptions = { ...options, baseURL: options.host || location.origin };
  const config = await api.getConfig(requestOptions);

  if (!isSupported()) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const subscription =
    'PushManager' in window
      ? await createPushSubscription({ ...options, ...config })
      : await createSafariPushSubscription(config);

  if (!('endpoint' in subscription)) throw new Error('Invalid subscription');
  await api.updateSubscription(requestOptions, subscription);
}

async function createPushSubscription(config: Config): Promise<PushSubscriptionJSON> {
  const registration = await registerServiceWorker({ path: config.serviceWorkerPath });

  // remove active subscription if there's any
  const activeSubscription = await registration.pushManager.getSubscription();
  if (activeSubscription) {
    await activeSubscription.unsubscribe().catch(() => void 0);
  }

  const applicationServerKey = config.project.vapid_public_key.replace(/=/g, '');
  const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
  return subscription.toJSON();
}

export async function prefetchConfig(options: SubscribeOptions) {
  await api.getConfig({ ...options, baseURL: options.host || location.origin });
}

async function createSafariPushSubscription(config: Config): Promise<PushSubscriptionJSON> {
  const safari = 'safari' in window ? (window['safari'] as any) : undefined;
  if (!safari) throw new Error('This is not Safari');

  const permissionData = safari.pushNotification.permission(config.website_push_id);
  if (permissionData.permission === 'granted') return permissionData;
  if (permissionData.permission === 'denied') throw new Error('permission denied');

  return new Promise<PushSubscriptionJSON & { platform: string }>(function (resolve, reject) {
    safari.pushNotification.requestPermission(
      config.safariPushURL,
      config.website_push_id,
      { authenticationToken: config.user.id },
      (permissionData: { deviceToken: string }) => {
        if (!permissionData.deviceToken) return reject(new Error('permission denied'));

        resolve({
          endpoint: permissionData.deviceToken,
          keys: { websitePushID: config.website_push_id },
          platform: 'safari',
        });
      },
    );
  });
}
