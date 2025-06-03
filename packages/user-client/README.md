# `@magicbell/user-client`

This package is deprecated. Please use [`magicbell-js`](https://www.magicbell.com/docs/libraries/magicbell-js) instead. Migrating is as simple as updating your import statements.

```diff
- import { Client } from '@magicbell/user-client';
+ import { Client } from 'magicbell-js/user-client';

const client = new Client({
  token: 'YOUR_TOKEN',
});

const { data } = await client.notifications.listNotifications({
  limit: 3,
  startingAfter: 'starting_after',
  endingBefore: 'ending_before',
});

console.log(data);
```
