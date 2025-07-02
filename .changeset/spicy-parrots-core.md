---
'@magicbell/core': minor
---

This package is deprecated. Please use [`magicbell-js`](https://www.magicbell.com/docs/libraries/magicbell-js) instead.

```diff
- import MagicBellClient from '@magicbell/core';
+ import { Client } from 'magicbell-js/project-client';

- const client = await MagicBellClient.createInstance({
-   apiKey: 'MAGICBELL_API_KEY',
-   userEmail: 'customer@example.com',
- });

+ const client = new Client({
+   token: 'your-access-token',
+ });
```
