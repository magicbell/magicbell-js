---
'magicbell': minor
---

Release [broadcasts resource](https://www.magicbell.com/docs/rest-api/reference#list-notification-broadcasts) as stable. This includes the following apis:

**List notification broadcasts**

```js
await magicbell.broadcasts.list({
  page: 1,
  per_page: 1,
});
```

**Fetch a notification broadcast by its ID**

```js
await magicbell.broadcasts.get('{broadcast_id}');
```

**Fetch notifications by broadcast id.**

```js
await magicbell.broadcasts.notifications.list('{broadcast_id}', {
  page: 1,
  per_page: 1,
});
```
