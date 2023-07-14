---
'magicbell': patch
---

A bug where the eventsource was closed before opened is now fixed. This race condition occurred when closing the stream while the token request was still pending.
