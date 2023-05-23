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

const api = {
  async getConfig({ token, project, baseURL }: RequestOptions) {
    return fetch(`${baseURL}/web_push_subscriptions?access_token=${token}&project=${project}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((x) => x.json() as Promise<{ push_subscription: Config }>)
      .then((x) => ({ ...x.push_subscription, baseURL }));
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

export async function registerServiceWorker({ path = '/sw.js' }: { path?: string } = {}) {
  // don't register a service-worker if there's already one
  if (navigator.serviceWorker.controller) return navigator.serviceWorker.ready;
  await navigator.serviceWorker.register(path);
  return navigator.serviceWorker.ready;
}

/**
 * Request permission to send push notifications and post the subscription to the MagicBell API.
 */
export async function subscribe(options: {
  token: string;
  project: string;
  host?: string;
  serviceWorkerPath?: string;
}) {
  if (!('PushManager' in window)) {
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
