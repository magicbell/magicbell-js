---
'magicbell': major
---

**Breaking Change**!

We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

If you use `topics` or `categories` filters in the `UserClient`, you'll need to update those params to their singular variant.

```diff
import { UserClient } from 'magicbell/user-client';

const magicbell = new UserClient({
  apiKey: 'your-api-key',
  userEmail: 'you@example.com',
});

const notifications = await magicbell.notifications.list({
-  categories: ['billing'],
+  category: 'billing',
-  topics: ['invoice-1'],
+  topic: 'invoice-1',
});
```
