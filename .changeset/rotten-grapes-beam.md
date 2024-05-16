---
'@magicbell/cli': minor
---

Add credential option to switch authentication scope for `magicbell api` requests

```shell
# include user credential headers (x-magicbell-user-email)
magicbell api /some-endpoint -r curl -c user
magicbell api /some-endpoint -r curl --credentials user

# include project credential headers (x-magicbell-api-secret)
magicbell api /some-endpoint -r curl -c project
magicbell api /some-endpoint -r curl --credentials project
```
