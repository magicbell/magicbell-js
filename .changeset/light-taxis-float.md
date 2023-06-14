---
'magicbell': minor
---

Release the [users.pushSubscriptions resource](https://www.magicbell.com/docs/rest-api/reference#fetch-user's-push-subscriptions) as stable. This includes the following apis:

**Fetch user's push subscriptions**

Fetch a user's push subscriptions. Returns a paginated list of web and mobile push subscriptions for all platforms.

```js
await magicbell.users.pushSubscriptions.list('{user_id}', {
  page: 1,
  per_page: 1,
});
```

**Delete user's push subscription**

Delete a user's push subscriptions. Identifies the user by the user's ID and the push subscription by the subscription's ID.

```js
await magicbell.users.pushSubscriptions.delete('{user_id}', '{subscription_id}');
```
