---
'@magicbell/webpush': minor
---

Add `getAuthToken` function to exchange API Key based user credentials for jwt token.

```js
import { getAuthToken } from '@magicbell/webpush';

// authenticate user by external id
getAuthToken({
  apiKey: '024…0bd',
  userExternalId: 'user_123',
  userHmac: 'NCI…I6M',
});

// or based by their email address
getAuthToken({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});
```
