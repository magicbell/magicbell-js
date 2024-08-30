---
'@magicbell/react-headless': major
---

**Breaking Change**!

We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

If you make use of different stores or filters using the `categories` or `topics` properties, you'll need to rename them to their singular variants.

```diff
import { MagicBellProvider } from '@magicbell/react-headless';

const stores = [
  { id: 'default', defaultQueryParams: {} },
  { id: 'unread', defaultQueryParams: { read: false } },
-  { id: 'billing', defaultQueryParams: { categories: ['billing'] } },
+  { id: 'billing', defaultQueryParams: { category: 'billing' } },
-  { id: 'support', defaultQueryParams: { topics: ['support'] } },
+  { id: 'support', defaultQueryParams: { topic: 'support' } },
];

export default function Index({ children }) {
  return (
    <MagicBellProvider
      apiKey="__MAGICBELL_API_KEY__"
      userEmail="__MAGICBELL_USER_EMAIL__"
      userKey="__MAGICBELL_USER_KEY__"
      stores={stores}
    >
      {children}
    </MagicBell>
  );
}
```
