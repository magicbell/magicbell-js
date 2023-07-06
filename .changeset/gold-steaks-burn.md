---
'@magicbell/cli': minor
---

The CLI now accepts the global `--print-request curl` option that prints the request object to the console. When that option is provided, the request will be printed in the requested format, and no network requests will be made. We'll add more formats in the future.

```shell
magicbell notifications list --print-request curl
magicbell notifications create --title hi --print-request curl
```
