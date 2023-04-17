---
'magicbell': minor
---

Update schemas for broadcast methods.

- dropped `broadcast.recipients_count`, use `broadcast.status.summary.total` instead.
- broadcast notification `status` is now an enum string.
- changed `sent_at` timestamps to be iso-strings.
- added `created_at` to broadcast.
- added `title` to broadcast notification
