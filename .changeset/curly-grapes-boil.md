---
'@magicbell/cli': minor
---

add `--host` flag so the cli can be used against other environments, such as localhost, staging and review.

```shell
magicbell --host localhost:3000
magicbell --host localhost:3000/api/v1
```

When an alternative host is provided during login, the host gets bound to that session. Meaning, the profile will use that host as default.

```shell
magicbell login
magicbell users list # run against production

# or export MAGICBELL_PROFILE=dev
magicbell login -p dev -h localhost:3000
magicbell users list -p dev # run against localhost:3000
```
