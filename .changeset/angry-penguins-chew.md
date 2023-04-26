---
'magicbell': minor
---

The `total` and `total_pages` props are removed from the following method return types:

- `magicbell.broadcasts.list()`
- `magicbell.broadcasts.notifications.list()`
- `magicbell.users.list()`

The [auto pagination](https://github.com/magicbell-io/magicbell-js/tree/main/packages/magicbell#using-promises) methods are updated to support the paginated responses that do not have those fields. Thereby, pagination helpers like `.list().forEach()`, `.list().toArray()` and the iterator in `for await (const node of method.list())` keep working as before.
