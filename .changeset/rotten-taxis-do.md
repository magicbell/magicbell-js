---
'@magicbell/react-headless': minor
---

We now expose the property to control the retries of failed network requests.
`network.maxRetries` defaults to `3`. Setting it to `0` disables retries entirely.

```tsx
import { MagicBellProvider } from '@magicbell/react-headless';

function Component() {
  return (
    <MagicBellProvider apiKey="your-api-key" userEmail="you@example.com" network={{ maxRetries: 5 }}>
      <App />
    </MagicBellProvider>
  );
}
```
