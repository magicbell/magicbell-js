---
'magicbell': minor
---

Add support for usage in browsers.

- Stop tracking `client-id`. Client id was a random token stored on the filesystem, so we could identify origins across session.
- Don't generate HMAC if no `api-secret` is provided, or if HMAC is already provided via request options.
- Export `createHmac`, a util that generates MagicBell compatible HMAC digests.

  ```js
  import { createHmac } from 'magicbell';
  createHmac(process.env.MAGICBELL_API_SECRET, user.email);
  ```
