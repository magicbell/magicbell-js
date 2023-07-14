---
'magicbell': patch
---

Optional client options can now be `undefined` or `null`, rather than enforced to be absent. This eases initialization where options come from other configuration sources.

```ts
const client = new UserClient({
  apiKey: '...',
  userEmail: 'person@example.com',
  userExternalId: undefined, // no longer throws
})
```
