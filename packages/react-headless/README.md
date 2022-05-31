[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![npm version](https://badgen.net/npm/v/@magicbell/react-headless)](https://www.npmjs.com/package/@magicbell/react-headless)

# React headless components for MagicBell

This package contains React headless components and hooks to build a
notification inbox for your site powered by [MagicBell](https://magicbell.com).

- Immutable
- Full [TypeScript](https://www.typescriptlang.org/) support
- Requires React 16.8+
- Compatible with [Preact](https://preactjs.com/)

## Table of Contents

- Components

  - [MagicBellProvider](#magicbellprovider)

- Hooks

  - [useNotifications](#usenotifications)
  - [useBell](#usebell)
  - [useMagicBellEvent](#usemagicbellevent)
  - [useNotification](#usenotification)
  - [useNotificationPreferences](#usenotificationpreferences)

- [The notification store](#the-notification-store)

## MagicBellProvider

The `MagicBellProvider` component is the main component for building a custom
notification inbox. It fetches configuration from
[MagicBell](https://magicbell.com) and keeps the list of notifications updated
in real time.

This is a headless component, so you can safely wrap your entire app in this
component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MagicBellProvider } from '@magicbell/react-headless';

ReactDOM.render(
  <MagicBellProvider apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    <App />
  </MagicBellProvider>,
  document.body,
);
```

These are all the properties accepted by this component.

| Property         | Type                  | Description                                                                             |
| ---------------- | --------------------- | --------------------------------------------------------------------------------------- |
| `apiKey`         | `string`              | The API key of your magicbell.io project                                                |
| `userEmail`      | `string`              | The email of the user you want to show notifications for                                |
| `userExternalId` | `string`              | The external ID of the user you want to show notifications for                          |
| `userKey`        | `string`              | The HMAC for the user. It is recommended to enable HMAC authentication but not required |
| `children`       | `React.ReactChildren` | The children to be wrapped in a`MagicBellContext.Provider`                              |
| `stores`         | `object[]`            | An optional object containing the definitions of the notification stores to create.     |

### Splitting the inbox

By default, one store for notifications is automatically configured. However,
you can split your notification inbox if you want to.

For example, to split your inbox in read and unread notifications define each
store as shown below:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MagicBellProvider } from '@magicbell/react-headless';

ReactDOM.render(
  <MagicBellProvider
    apiKey={MAGICBELL_API_KEY}
    userEmail="john@example.com"
    stores=[{ id: 'read', defaultQueryParams: { read: true }}, { id: 'unread', defaultQueryParams: { read: false }}]>
    <App />
  </MagicBellProvider>,
  document.body,
);
```

Each store needs an `id` and the query params (`defaultQueryParams`) used for
filtering notifications when you fetch them from the MagicBell API server.

## useNotifications

Hook to get a store of notifications for the current authenticated user. Returns
a [`notification store`](#the-notification-store).

Use this hook in the component that will render a list of notifications.

```javascript
import { useNotifications } from '@magicbell/react-headless';

function Notifications() {
  const store = useNotifications();

  return (
    <ul>
      {store.notifications.map((notification) => (
        <li key={notification.id}>{notification.title}</li>
      ))}
    </ul>
  );
}
```

When you split your inbox, provide the id of your store, e.g.:

```javascript
import { useNotifications } from '@magicbell/react-headless';

function Notifications() {
  const store = useNotifications('unread');

  return (
    <ul>
      {store.notifications.map((notification) => (
        <li key={notification.id}>{notification.title}</li>
      ))}
    </ul>
  );
}
```

Keep in mind, that the unread store should have been defined previously (see
[splitting the inbox](#splitting-the-inbox)).

## useBell

This hook is very similar to the `useNotifications` hook. It will return a
[notification store](#the-notification-store).

```javascript
import { useBell } from '@magicbell/react-headless';

function NotificationsList() {
  const { unreadCount, markAllAsSeen } = useBell();

  return (
    <button onClick={() => markAllAsSeen()}>
      <span>{unreadCount}</span>
    </button>
  );
}
```

The `unreadCount` will be updated in realtime when new notifications arrive.

The only difference between the `useNotifications` hook and this one is the
implementation of the `markAllAsSeen` function. This function will mark
notifications as seen in other tabs, but not the current. This can help users to
identify new notifications (based on a style you would implement, for example).

When you split the notification inbox, you will have to provide the id of the
store you want to fetch notifications from:

```javascript
import { useBell } from '@magicbell/react-headless';

function NotificationsList() {
  const { unreadCount, markAllAsSeen } = useBell('unread');

  return (
    <button onClick={() => markAllAsSeen()}>
      <span>{unreadCount}</span>
    </button>
  );
}
```

## useMagicBellEvent

This is a hook to listen to events, including realtime ones (generated in other tabs). Use it to be notified when a
realtime event happens, for example to play a sound when a new notification arrives
(read more [in our guides](https://magicbell.com/docs/react/play-sound-new-notification)).

```javascript
import { useMagicBellEvent } from '@magicbell/react-headless';

useMagicBellEvent('notifications.new', (notification) => {
  // Do something like showing a push notification
});
```

This is a list of events you can listen to:

| Event name               | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `*`                      | Any event                                                 |
| `notifications.new`      | A new notification for the authenticated user was created |
| `notifications.read`     | A notification was marked as read                         |
| `notifications.read.all` | All notifications were marked as read                     |
| `notifications.unread`   | A notification was marked as unread                       |
| `notifications.seen.all` | All notifications were marked as seen                     |
| `notifications.delete`   | A notification was deleted                                |
| `disconnected`           | The websocket connection was dropped                      |
| `reconnected`            | The websocket connection was reestablished                |

You can also limit the source of the events you want to listen to:

- `remote`, to listen to events generated _in other tabs_ or the _MagicBell server_ only
- `local`, to listen to events generated _in the same tab_ only
- `any`, to listen to all events regardless of where it was generated

It is set to `any` by default.

```javascript
import { useMagicBellEvent } from '@magicbell/react-headless';

useMagicBellEvent('notifications.new', callbackFn, { source: 'remote' });
```

## useNotification

Use this hook in the component that renders a notification. It will return a
[Notification](#the-notification) object with all the methods needed to mutate
it.

```javascript
import { useNotification } from '@magicbell/react-headless';

function Notification(rawNotification) {
  const notification = useNotification();

  const handleClick = () => {
    if (notification.isRead) notification.markAsUnread();
    else notification.markAsRead();
  };

  return (
    <button onClick={handleClick}>
      <p>{notification.title}</p>
      <p>{notification.sentAt.format('DDD MM, YYYY')}</p>
    </button>
  );
}
```

## useNotificationPreferences

Use this hook to fetch and update the notification preferences for the user.

```javascript
import { useNotificationPreferences } from '@magicbell/react-headless';

function NotificationPreferences() {
  const { fetch, categories } = useNotificationPreferences();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.slug}>
          <p>{category.label}</p>
          <div>
            {category.channels.map((channel) => (
              <p key={channel.slug}>
                {channel.label}: {channel.enabled}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
```

## The notification store

Some of the hooks described above return a notification store which implement
this interface:

```typescript
interface INotificationStore {
  unseenCount: number;
  unreadCount: number;
  total: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  notifications: Notification[];

  isEmpty: boolean;
  hasNextPage: boolean;

  fetch: (queryParams) => Promise;
  fetchNextPage: (queryParams) => Promise;
  markAllAsRead: () => Promise<boolean>;
  markAllAsSeen: () => Promise<boolean>;
}
```

#### `fetch`

Fetch notifications from the magicbell server. The pagination data is also
updated. The provided query parameters are included in the request to the
server.

The response is appended to the current array of notifications, so it can be
used as the view model for an infinite scroll list. If you want to reset the
collection instead, pass the `reset: true` option to this method:

```js
notifications.fetch({ page: 2 }, { reset: true });
```

#### `fetchNextPage`

This method is simply wrapping the `fetch` method, sending as a parameter the
next page of notifications. You can include query parameters to this method.

#### `markAllAsRead`

Makes a POST request to the [read notifications API endpoint](https://magicbell.com/docs/rest-api/reference#mark-a-users-notification-as-read).
It also sets the `unreadCount` of the store to 0 and the `readAt` attribute of
all notifications to the current time.

#### `markAllAsSeen`

Makes a POST request to the [seen notifications API endpoint](https://magicbell.com/docs/rest-api/reference#mark-a-users-notification-as-seen).
It also sets the `unseenCount` of the store to 0 and the `seenAt` attribute of
all notifications to the current time.
