---
'@magicbell/magicbell-react': minor
---

We now expose the property to control the retries of failed network request.
`network.maxRetries` defaults to `3`. Setting it to `0` disables retries entirely.

```tsx
import MagicBellProvider, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

function Component() {
  return (
    <MagicBellProvider apiKey="your-api-key" userEmail="you@example.com" network={{ maxRetries: 5 }}>
      {(props) => <FloatingNotificationInbox height={300} {...props} />}
    </MagicBellProvider>
  );
}
```
