---
'@magicbell/webpush': patch
---

fix issue in `isSubscribed` method that caused it to be stuck waiting for the service worker `ready` event when no service worker was registered.
