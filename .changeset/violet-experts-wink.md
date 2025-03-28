---
'@magicbell/magicbell-react': minor
---

Network requests are now deduped. You can control this behavior using the
`network.cacheTTL` setting. Setting it to `0` disables caching entirely. The TTL
defaults to one second. Meaning any identical request within that second shares
the same Promise and thus outcome.

```tsx
import MagicBellProvider, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

function Component() {
  return (
    <MagicBellProvider apiKey="your-api-key" userEmail="you@example.com" network={{ cacheTTL: 1_000 }}>
      {(props) => <FloatingNotificationInbox height={300} {...props} />}
    </MagicBellProvider>
  );
}
```
