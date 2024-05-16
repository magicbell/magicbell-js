---
'@magicbell/cli': minor
---

Also accept lowercase method names in the `magicbell api -X {method}` command.

These commands are now the same:

```shell
magicbell api /integrations -X POST -d '{ ... }'
magicbell api /integrations -X post -d '{ ... }'
```
