---
'@magicbell/project-client': patch
'@magicbell/user-client': patch
---

The `@magicbell/project-client` and `@magicbell/user-client` packages are now deprecated. Please migrate to `magicbell-js` instead. Migration is trivial, and should be as simple as updating your import statements.

```diff
- import { Client } from '@magicbell/project-client';
+ import { Client } from 'magicbell-js/project-client';

- import { Client } from '@magicbell/project-client';
+ import { Client } from 'magicbell-js/project-client';
```
