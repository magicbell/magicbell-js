---
'magicbell': minor
---

Released the `.listen` method. With this method you can listen to server sent events in realtime. For example, to do something when new notifications come in, or to trigger an event when a user marks a notification as read.

The following events are currently emitted. Please note that all events are bound to a specific user. See [#realtime](https://github.com/magicbell-io/magicbell-js/blob/main/packages/magicbell/README.md#realtime) for more information.

| event.name               | description                                |
| ------------------------ | ------------------------------------------ |
| `notifications/new`      | a new notification has been created        |
| `notifications/read`     | a notification has been read               |
| `notifications/unread`   | a notification has been marked as unread   |
| `notifications/delete`   | a notification has been deleted            |
| `notifications/read/all` | all notifications have been marked as read |
| `notifications/seen/all` | all notifications have been marked as seen |
