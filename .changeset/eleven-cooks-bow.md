---
'@magicbell/cli': minor
---

We've added a method to list the registered push subscriptions for a given user using user credentials.

```shell
magicbell user push-subscriptions list \
  --user-email person@example.com
```

Note that this method returns the same data as the project scoped `magicbell users push-subscriptions <user-id>`.
