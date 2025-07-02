---
'@magicbell/magicbell-react': minor
---

This package is deprecated. Please use [`@magicbell/react`](https://www.magicbell.com/docs/libraries/magicbell-react) instead.

```diff
- import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
+ import Provider from "@magicbell/react/context-provider";
+ import FloatingInbox from "@magicbell/react/floating-inbox";

function App(props: any) {
  return (
-   <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
-     {(props) => <FloatingNotificationInbox height={300} {...props} />}
-   </MagicBell>,
+   <Provider token="abc123">
+     <FloatingInbox height={500} />
+   </Provider>
  );
}
```
