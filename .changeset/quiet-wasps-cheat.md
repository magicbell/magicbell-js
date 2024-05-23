---
'@magicbell/webpush': major
---

**BREAKING CHANGE!**

This is a complete revamp of how we're registering client push notifications, but given that the API surface is small, migrating should be easy enough.

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

This is a new method that didn't exist in previous versions. Unsubscribing and resubscribing is now trivial, giving your users the option to "pause" push notifications.

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

+ client.getAuthToken();
```
