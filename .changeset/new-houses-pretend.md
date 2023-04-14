---
'magicbell': minor
---

feat: add `broadcasts.notifications.list` method to the client.

```ts
const notifications = magicbell.broadcasts.notifications.list(broadcastId, { per_page: 10 });

await notifications.forEach((notification) => {
  console.log(notification.id);
});
```
