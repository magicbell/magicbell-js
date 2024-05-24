---
'@magicbell/webpush': major
---

**BREAKING CHANGE!**

This is a complete revamp of how we're registering client push notification subscriptions, but given that the v1 API surface is small, migrating should be easy enough. You can find [the migration guide on our site](https://magicbell.com/docs/guides/migrations/upgrade-magicbell-webpush-to-v2).

The methods mentioned here are the breaking ones that you use when interacting with the browser directly. We've also added a bunch of functions to interact with the MagicBell API directly, leaving all browser interaction for you to implement. Think of use cases where you already have a service worker, and just want to push the channel tokens to our backend, or because you need to list all the currently active channel tokens so the user can unsubscribe from a device they no longer control.

Please read more about those methods in [the docs for @magicbell/webpush](https://magicbell.com/docs/libraries/webpush#api-methods)

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

This is a new method that didn't exist in previous versions. Unsubscribing and resubscribing is now trivial, giving your users the option to "pause" the push notifications.

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

- const subscribed = await isSubscribed({
-   token: token.token,
-   project: token.project,
- });

+ const subscribed = await client.isSubscribed();
```

**Get authentication token**

The authentication token is no longer required for basic functionality, but can still be used to for example transfer the session to a popup.

```diff
- import { getAuthToken } from '@magicbell/webpush';
+ import { WebPushClient } from '@magicbell/webpush';

- const token = await getAuthToken({
+ const client = new WebPushClient({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});

+ const token = await client.getAuthToken();
```

**API Methods**

We've added a bunch of useful methods to work with our api directly. Please read more about those methods in [the docs for @magicbell/webpush](https://magicbell.com/docs/libraries/webpush#api-methods).
