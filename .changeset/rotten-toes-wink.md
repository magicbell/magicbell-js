---
'@magicbell/cli': minor
'magicbell': minor
---

We now use [debug] for logging, and have dropped support for the `debug` property that could be provided to `Client`. Debugging can be enabled via the `DEBUG` environment variable.

We're using the namespaces `magicbell:debug`, `magicbell:log` and `magicbell:error`.

```shell
DEBUG=magicbell:* node my-app.js
DEBUG=magicbell:debug node my-app.js
```

[debug]: https://npmjs.com/debug
