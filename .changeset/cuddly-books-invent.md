---
'magicbell': minor
---

Added a `users.notifications` resource which can be used to iterate notifications for a given user.

```ts
const notifications = magicbell.users.notifications.list(userId, { per_page: 10 });

for await (const notification of notifications) {
  console.log(notification.title);
}
```
