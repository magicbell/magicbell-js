---
'magicbell': minor
---

Rename `users.fetch` to `users.get`. Tho it's in theory a breaking change, the users api is relatively new, and the convention in this sdk is to use `get` for single entity retrieval, and not `fetch`. So we're going with a `minor` instead to get this fixed.
