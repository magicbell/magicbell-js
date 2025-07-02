---
'magicbell': minor
---

This package is deprecated. Please use [`magicbell-js`](https://www.magicbell.com/docs/libraries/magicbell-js) instead.

**Project Client**

```diff
- import { ProjectClient } from 'magicbell/project-client';
+ import { Client } from 'magicbell-js/project-client';

- const magicbell = new ProjectClient({
-  apiKey: 'your-api-key',
-  apiSecret: 'your-api-secret',
- });

+ const client = new Client({
+   token: 'your-access-token',
+ });
```

**User Client**

```diff
- import { Userclient } from 'magicbell/user-client';
+ import { Client } from 'magicbell-js/project-client';

- const magicbell = new Userclient({
-  apiKey: 'your-api-key',
-  apiSecret: 'your-api-secret',
- });

+ const client = new Client({
+   token: 'your-user-jwt',
+ });
```
