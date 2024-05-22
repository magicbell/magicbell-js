---
'@magicbell/webpush': major
---

BREAKING CHANGE!: This is a complete revamp of how we're registering client push notifications, but given that the API surface is small, migrating should be easy enough.

```ts
import { WebPushClient } from '@magicbell/webpush';

const client = new WebPushClient({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});

await client.isSubscribed();
await client.subscribe();
await client.unsubscribe();
```

**Verify browser support**

This function is unchanged.

```ts
import { isSupported } from '@magicbell/webpush';
isSupported();
```

**Service worker registration**

We still attempt to lazily register a service worker during other methods if you don't have one registered, but we no longer expose a utility for you to do so. When you do have your own service worker, and used our util, please update your initialization as follows:

```diff
- import { registerServiceWorker } from '@magicbell/webpush';
- registerServiceWorker({ path: '/sw.js' });

+ navigator.serviceWorker.register('/sw.js');
```

When you prefer to lazily register the service worker using this client, simply provide the `serviceWorkerPath` to the client constructor.

```ts
import { WebPushClient } from '@magicbell/webpush';

const client = new WebPushClient({
  // ...
  serviceWorkerPath: '/sw.js',
});
```

For completeness, your service worker file should include:

```ts
importScripts('https://assets.magicbell.io/web-push-notifications/sw.js');
```

**Subscribe to push notifications:**

Subscribing to push notifications is now a single call on the client, instead of the two-step flow from v1.

```diff
- import { getAuthToken, subscribe } from '@magicbell/webpush';
+ import { WebPushClient } from '@magicbell/webpush';

- const token = await getAuthToken({
+ const client = new WebPushClient({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});

- await subscribe({
-   token: token.token,
-   project: token.project,
- });

+ await client.subscribe();
```

**Unsubscribe from push notifications.**

This is a new method that wasn't exposed in previous versions. Unsubscribing and resubscribing is now trivial, giving your users the option to "pause" push notifications.

```ts
import { WebPushClient } from '@magicbell/webpush';

const client = new WebPushClient({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});

await client.unsubscribe();
```

**Get subscription status**

Verifying subscription status is now a single call on the client, instead of the two-step flow from v1.

```diff
- import { getAuthToken, isSubscribed } from '@magicbell/webpush';
+ import { WebPushClient } from '@magicbell/webpush';

- const token = await getAuthToken({
+ const client = new WebPushClient({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});

- const subscribed = await subscribe({
-   token: token.token,
-   project: token.project,
- });

+ const subscribed = await client.isSubscribed();
```
