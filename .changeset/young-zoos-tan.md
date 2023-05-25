---
'@magicbell/webpush': minor
---

Added warmup method to speedup subscription process. By prefetching config, you'll separate the subscription from config fetching, and thereby reduce the time to subscribe, which improves the user experience.

```js
import { prefetchConfig } from '@magicbell/webpush';

prefetchConfig({
  token: 'jwt-token',
  host: 'https://api.magicbell.com',
  project: 'string',
  serviceWorkerPath: '/sw.js',
});
```
