---
'magicbell': patch
---

Fixed a few misconfigured types:

- import `status` is now an enum with the values `enqueued | processing | processed`
- import `failures` now has the users array items typed as `object` with the properties `email` and `external_id` and `errors`
- the `total` and `total_pages` props are removed from the `users.pushSubscriptions.list` response.
