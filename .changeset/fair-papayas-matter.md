---
'@magicbell/cli': minor
---

Support reading email or external id for user commands from profile. With this change, instead of running `magicbell user notifications list --user-email person@example.com`, one can run also run:

```shell
# magicbell user notifications list --user-email person@example.com
magicbell config set userEmail person@example.com
magicbell user notifications list
```

or

```shell
# magicbell user notifications list --user-external-id abc
magicbell config set userExternalId abc
magicbell user notifications list
```

Note that the arguments still take precedence when provided.
