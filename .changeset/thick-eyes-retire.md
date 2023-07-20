---
'magicbell': minor
---

We've added a method to the `UserClient` to list the registered push notifications for the authenticated user.

```js
const magicbell = new UserClient({ ... });
await magicbell.pushSubscriptions.list();
```

This method returns the same data as `users.pushSubscriptions.list` on the `Projectclient`, but using user credentials instead of the secret key. Thereby, it's safe to use this method on the frontend to offer a way to the user to manage their push subscriptions.
