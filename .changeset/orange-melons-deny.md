---
'magicbell': minor
---

Add support for nested paths in `host` option.

```ts
import { ProjectClient } from 'magicbell/project-client';

const magicbell = new ProjectClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  host: 'https://example.com/api/mocks/magicbell',
});
```
