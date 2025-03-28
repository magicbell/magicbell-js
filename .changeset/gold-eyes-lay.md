---
'magicbell': minor
---

Network requests are now deduped. You can control this behavior using the
`cacheTTL` setting. Set it to `0` to disable. The TTL defaults to one second.
Meaning any identical request within that second shares the same Promise and
thus outcome.

```ts
import { UserClient } from 'magicbell/user-client';

const magicbell = new UserClient({
  apiKey: 'your-api-key',
  userEmail: 'you@example.com',
  cacheTTL: 1_000,
});
```
