---
'@magicbell/webpush': major
---

feat: add `registerServiceWorker` method that can be used to register a service
worker, prior to calling `subscribe`. This preflight allows for a faster
subscription process.

Registration will be skipped if a service worker is already registered. In which
case, the active registration will be returned.

The returned promise resolves when the registration is ready.

```js
import { registerServiceWorker } from '@magicbell/webpush';
registerServiceWorker({ path: '/sw.js' });
```

**NOTE:**

This milestone also marks the `@magicbell/webpush` as stable. We will be following
[semantic versioning](https://semver.org/) going forward.
