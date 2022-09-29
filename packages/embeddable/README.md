# MagicBell Notification Inbox

This package contains a notification inbox for your site powered by [MagicBell](https://magicbell.com).

> **Note**
>
> Don't use this package when you're using React. Use [@magicbell/magicbell-react](https://github.com/magicbell-io/magicbell-js/tree/main/packages/react) or [@magicbell/react-headless](https://github.com/magicbell-io/magicbell-js/tree/main/packages/react-headless) instead.

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

## The MagicBell Widget

The `renderWidget` function creates and palaces a MagicBell widget on your web page.

### `renderWidget(targetElement, options)`

- **targetElement** _HTMLElement_

  The MagicBell widget is rendered **within** the provided `targetElement`.

- **options** _WidgetProps_

  Options to configure the MagicBell widget.

  | Property            | Type                                  | Description                                                                                                                                                                  |
  | ------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `apiKey`            | `string`                              | The API key of your magicbell.io project                                                                                                                                     |
  | `userEmail`         | `string`                              | The email of the user you want to show notifications for                                                                                                                     |
  | `userExternalId`    | `string`                              | The external ID of the user you want to show notifications for. See [the Users documentation](https://developer.magicbell.io/docs/core-concepts#users) for more information. |
  | `userKey`           | `string`                              | The HMAC for the user. It is recommended to enable HMAC authentication but not required                                                                                      |
  | `theme`             | `IMagicBellTheme`                     | An optional object containing custom color values for the widget, see [Custom Themes](#custom-themes)                                                                        |
  | `defaultIsOpen`     | `boolean`                             | An optional flag to set the default visibility state of the element returned by the children function. It is `false` by default.                                             |
  | `onNewNotification` | `(notification) => void`              | An optional function called when a new notification arrives.                                                                                                                 |
  | `locale`            | `string or CustomLocale`              | Locale to use in the components.                                                                                                                                             |
  | `serverURL`         | `string`                              | The url to the notifications backend api service currently defaulted to `https://api.magicbell.com`.                                                                         |
  | `images?`           | `Partial<{ emptyInboxUrl: string; }>` | Image to use when the inbox is empty.                                                                                                                                        |

- **returns** _MagicBellEventEmitter_

  An event emitter which enables you to listen to and act upon MagicBell events.

  NOTE: For multiple calls to the `renderWidget`, the same emitter instances is returned.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const targetElement = document.getElementById('magicBellTargetElement');
const emitter = renderWidget(targetElement, options);
```

## Events

An event emitter is returned by `renderWidget` which enables you to listen to and act upon MagicBell events. For example, you may want to play a sound for new notifications or synchronize your UI with the read state of a notification in the inbox.

Note: The underlying emitter library used is [mitt](https://github.com/developit/mitt). Only the `on` and `off` methods are exposed.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const emitter = renderWidget(targetElement, options);

emitter.on('notifications.new', (event) => {
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

This method is used to subscribe to events of a certain type. The provided handler is a function that will be called every time the event occurs. See [mitt on](https://github.com/developit/mitt#on) for more details.

- **type** _String_

  The name of one of the events as listed in the table above.

- **handler** _(event: { data, source }) => void_

  The handler to run when the event occurs. The handler receives a single object argument. This event object, has two properties: `data` and `source`.

  - `event.data` is an object containing notification data related to the event. For example the notification object that was read in case of `notifications.read`.

  - `event.source` is either `local` or `remote`. Local events imply that the user did something to cause the event to be triggered. Fore example, manually marking a notification as read. Remote events are caused by a remote change. Either MagicBell pushed a change, like a new notification, or the user did something on another client or browser tab.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const widget = renderWidget(targetElement, options);

function onRead({ data, source }) {
  console.log('notification source', source);
  console.log('notification read', data);
}

widget.on('notifications.read', onRead);
```

### `off(type, handler)`

This is the method to call if you need to stop listening to events that you're subscribed to. See [mitt off](https://github.com/developit/mitt#off) for more details.

- **type** _String_

  The name of one of the event that you're currently subscribed to. Passing `*` will detach all handlers.

- **handler** _(event: { data, source }) => void_

  The currently attached handler, that you wish to detach. Required because multiple handlers can be attached to the same notification type.

```javascript
import { renderWidget } from '@magicbell/embeddable';

const emitter = renderWidget(targetElement, options);

function onRead({ data }) {
  console.log('notification read', data);
}

function onRead2({ data }) {
  console.log('notification read2', data);
}

// Assign more than one function to an emitter action
widget.on('notifications.read', onRead);
widget.on('notifications.read', onRead2);

// Turn off the onRead function
emitter.off('notifications.read', onRead);
```

## Cleanup

In some frameworks, such as [Vue.js](https://vuejs.org) and [Angular](https://angular.io/), you will need to manually clean up any MagicBell widgets created with `renderWidget`.

These methods assure that any MagicBell widget is cleaned up.

### `cleanup(widget)`

This is the method to call if you want to explicitly unmount a MagicBell widget.

- **widget** _HTMLElement_

  The element containing the magicbell widget.

```javascript
// Single widget cleanup
import { renderWidget, cleanup } from '@magicbell/embeddable';

const emitter = renderWidget(targetElement, options);
cleanup(targetElement); // immediately cleanup and unmount the widget
```

### `cleanupAll()`

This is the method to call if you want to explicitly unmount all MagicBell widgets.

```javascript
// Multiple widget cleanup
import { renderWidget, cleanup } from '@magicbell/embeddable';

const emitter = renderWidget(targetElement, options);
renderWidget(targetElement, options);
cleanupAll(); // unmount all widgets
```

## Custom Themes

Is is possible to customize the text color, font size and border radius of some elements by providing to the [`MagicBell`](#magicbell) component a `theme` property. This is going to be deep merged with the default theme.

This is the definition of the default theme:

```javascript
{
  icon: {
    borderColor: '#3498F4',
    width: '24px',
  },
  header: {
    backgroundColor: '#3498F4',
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    fontSize: '14px',
    textColor: 'white',
    textAlign: 'left',
    textTransform: 'none',
  },
  footer: {
    backgroundColor: '#3498F4',
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    fontSize: '14px',
    textColor: 'white',
    textAlign: 'right',
    textTransform: 'none',
  },
  unseenBadge: {
    backgroundColor: '#DF4759',
    backgroundOpacity: 1,
    borderRadius: '2px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    fontSize: '14px',
    textColor: 'white',
    textAlign: 'left',
    textTransform: 'none',
  },
  container: {
    backgroundColor: '#FFFFFF',
    backgroundOpacity: 1,
    borderRadius: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    fontSize: '14px',
    textAlign: 'left',
    textColor: '#3A424D',
    textTransform: 'none',
  },
  notification: {
    default: {
      backgroundColor: '#3498F4',
      backgroundOpacity: 0.1,
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      fontSize: '14px',
      textColor: '#3A424D',
      textAlign: 'left',
      textTransform: 'none',
    },
    unread: {
      backgroundColor: '#D9E2EF',
      backgroundOpacity: 0.1,
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      fontSize: '14px',
      textColor: '#3A424D',
      textAlign: 'left',
      textTransform: 'none',
    },
    unseen: {
      backgroundColor: '#D9E2EF',
      backgroundOpacity: 0.05,
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      fontSize: '14px',
      textColor: '#3A424D',
      textAlign: 'left',
      textTransform: 'none',
    },
  },
}
```
