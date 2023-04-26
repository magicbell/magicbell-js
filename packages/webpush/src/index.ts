function stringToUint8Array(plainString: string) {
  const padding = '='.repeat((4 - (plainString.length % 4)) % 4);
  const base64 = (plainString + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

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
      .then((x) => x.json() as Promise<{ push_subscription: Omit<Config, 'baseURL' | 'safariPushURL'> }>)
      .then((x) => ({ ...x.push_subscription, baseURL, safariPushURL: `${baseURL}/safari/push` }));
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

/**
 * Request permission to send push notifications and post the subscription to the MagicBell API.
 */
export async function subscribe(options: { token: string; project: string; host?: string }) {
  const requestOptions = { ...options, baseURL: options.host || location.origin };
  const config = await api.getConfig(requestOptions);

  if (!('PushManager' in window) && !('safari' in window)) {
    throw new Error('Push notifications are not supported in this browser');
  }

  const subscription = !('PushManager' in window)
    ? await createSafariPushSubscription(config)
    : await createPushSubscription(config);

  if (!('endpoint' in subscription)) return;
  await api.updateSubscription(requestOptions, subscription);
}

async function createPushSubscription(config: Config): Promise<PushSubscriptionJSON> {
  await navigator.serviceWorker.register('/sw.js');
  const registration = await navigator.serviceWorker.ready;

  const applicationServerKey = stringToUint8Array(config.project.vapid_public_key);
  const subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
  return subscription.toJSON();
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
