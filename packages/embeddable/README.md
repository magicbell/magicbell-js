# MagicBell Notification Inbox

This package contains a notification inbox for your site powered by [MagicBell](https://magicbell.com).

## Quick Start

```sh
npm i @magicbell/embeddable
# or
yarn add @magicbell/embeddable
```

```html
<div id="notifications-inbox" />

<script type="module">
  import { renderWidget } from '@magicbell/embeddable';

  const targetElement = document.getElementById('notifications-inbox');
  const options = {
    apiKey: MAGICBELL_API_KEY,
    userEmail: CURRENT_USER_EMAIL,
    height: 500,
  };

  renderWidget(targetElement, options);
</script>
```

## Events

The `renderWidget` method returns an event emitter that enables you to listen to MagicBell events and act upon those. For example, to play a sound for new notifications, or to synchronize your UI with the read state of a notification in the inbox.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const widget = renderWidget(targetElement, options);

widget.on('notifications.new', (event) => {
  console.log('new notification received', event);
});
```

### Available Events

This is a list of events you can listen to:

| Event name               | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `notifications.new`      | A new notification for the authenticated user was created |
| `notifications.read`     | A notification was marked as read                         |
| `notifications.read.all` | All notifications were marked as read                     |
| `notifications.unread`   | A notification was marked as unread                       |
| `notifications.seen`     | A notification was marked as seen                         |
| `notifications.seen.all` | All notifications were marked as seen                     |
| `notifications.delete`   | A notification was deleted                                |

### `on(type, handler)`

This method is used to subscribe to events of a certain type. The provided handler is a function that will be called every time the event occurs.

- **type** _String_

  The name of one of the events as listed in the table above.

- **handler** _(event: { data, source }) => void_

  The handler to run when the event occurs. The handler receives a single object argument. This event object, has two properties. `data` and `source`.

  - `event.data` is an object containing notification data related to the event. For example the notification object that was read in case of `notifications.read`.

  - `event.source` is either `local` or `remote`. Local events imply that the user did something to cause the event to be triggered. Fore example, manually marking a notification as read. Remote events are caused by a remote change. Either MagicBell pushed a change, like a new notification, or the user did something on another client or browser tab.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const widget = renderWidget(targetElement, options);

function onRead({ data }) {
  console.log('notification read', data);
}

widget.on('notifications.read', onRead);
```

### `off(type, handler)`

This is the method to call if you need to stop listening to events that you're subscribed to.

- **type** _String_

  The name of one of the event that you're currently subscribed to.

- **handler** _(event: { data, source }) => void_

  The currently attached handler, that you wish to detach.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const widget = renderWidget(targetElement, options);

function onRead({ data }) {
  console.log('notification read', data);
}

widget.off('notifications.read', onRead);
```
