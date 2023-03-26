---
'magicbell': minor
---

feat: support custom request headers

Custom request headers can be used to decorate requests for logs and metrics or for example to instruct proxy servers.

```ts
import MagicBell from 'magicbell';

const magicbell = new MagicBell({
  apiKey: 'my-api-key',
  headers: {
    'X-Custom-Header': 'foo',
  },
});
```
