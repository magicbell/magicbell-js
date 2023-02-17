---
'magicbell': minor
---

feat: add close method to realtime listener

```ts
const listener = magicbell.listen();

listener.forEach((notification) => {
  console.log(notification.data.id);
});

// stop listening after 5 seconds
setTimeout(() => {
  listener.close();
}, 5_000);
```
