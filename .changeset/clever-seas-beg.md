---
'magicbell': minor
---

update broadcast > notification response schema to include the fields:

- `created_at`; datetime when notification was created
- `updated_at`; datetime when notification was last updated
- `seen_at`; datetime when notification was first seen
- `read_at`; datetime when notification was first read
- `status`; enum showing current state, current values: `unseen`, `unread`, `read`, `archived`

Further changes are:

- `recipient`; is marked as non-nullable
- `deliveries`; is marked as non-nullable
