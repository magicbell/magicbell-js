---
'@magicbell/webpush': minor
---

Adds an 'isSubscribed' method that checks if the user is subscribed to push notifications in the current browser, e.g.

```js
import { isSubscribed } from '@magicbell/webpush';

const subscribed = await isSubscribed({
  token: 'jwt-token',
  host: 'https://api.magicbell.com',
  project: 'string',
});

if (subscribed) {
  // Do something
} else {
  // Do something else
}
```
