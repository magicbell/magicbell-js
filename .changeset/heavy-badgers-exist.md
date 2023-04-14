---
'magicbell': minor
---

feat: add broadcasts.list method to the client.

```ts
const broadcasts = magicbell.broadcasts.list({ per_page: 10 });

await broadcasts.forEach((broadcast) => {
  console.log(broadcast.id);
});
```
