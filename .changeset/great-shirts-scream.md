---
'magicbell': minor
---

The magicbell client now supports lifecycle hooks. This way you can add custom logic to the client when certain events occur. For example to add logging, or to wrap requests with timing information.

Your hooks will be passed directly to ky, so please see [ky/hooks] for more information.

```js
const magicbell = new Client({
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [(request, options, error, retryCount) => {}],
    beforeError: [(error) => error],
    afterResponse: [(request, options, response) => response],
  },
});
```

[ky/hooks]: https://github.com/sindresorhus/ky#hooks
