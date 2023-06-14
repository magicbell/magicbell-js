---
'magicbell': minor
---

Added support for per-request header overrides

```js
const magicbell = new Client({
  headers: {
    'x-custom-header-one': 'one',
  },
});

await client.request({
  path: '/me',
  headers: {
    'x-custom-header-two': 'two',
  },
});

// request is made using the following headers:
//   x-custom-header-one: one
//   x-custom-header-two: two
```
