[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![npm version](https://badgen.net/npm/v/@magicbell/react-headless)](https://www.npmjs.com/package/@magicbell/react-headless)

# React headless components for MagicBell

This package contains a set of React headless components and hooks to build a notification inbox for your site powered by [magicbell.io](https://magicbell.io).

- Full [TypeScript](https://www.typescriptlang.org/) support
- Requires React 16.8+

## Table of Contents

- Components

  - [Introduction](#introduction)
  - [MagicBellProvider](#magicbellprovider)

- Hooks

  - [useBell](#usebell)
  - [useMagicBellEvent](#usemagicbellevent)
  - [useNotifications](#usenotifications)

- [The notification store](#the-notification-store)

## Introduction

This package is built using [MobX](https://mobx.js.org), so you can build a reactive UI. The notification store and its items are MobX observables. To use this package you just need to remeber this: any component that should be updated after mounting your component **has to observe changes to the observable objects we expose**. This is as simple as this:

```javascript
// Before
export default function Notification(props) {}

// After
import { observer } from '@magicbell/react-headless';

function Notification(props) {}
export default observer(Notification);
```

The overhead of `observer` itself is negligible.

Once you make your custom component observe changes, it will be updated automatically.

## MagicBellProvider

The `MagicBellProvider` component is the main component for building a custom notification inbox. It initializes a connection to [magicbell.io](https://magicbell.io), creates a `MagicBellContext` and keeps the list of notifications updated in real time. You won't be able to use other components and hooks of this package outside of the context of this component.

This is a headless component, so you can safely wrap your entire app in this component.

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

| Property         | Type          | Description                                                                             |
| ---------------- | ------------- | --------------------------------------------------------------------------------------- |
| `apiKey`         | `string`      | The API key of your magicbell.io project                                                |
| `userEmail`      | `string`      | The email of the user you want to show notifications for                                |
| `userExternalId` | `string`      | The external ID of the user you want to show notifications for                          |
| `userKey`        | `string`      | The HMAC for the user. It is recommended to enable HMAC authentication but not required |
| `children`       | `JSX.Element` | The children to be wrapped in a `MagicBellContext.Provider`                             |
| `stores`         | `object[]`    | An optional object containing the definitions of the notification stores to create.     |

### Multiple notifications store support

It is possible to handle multiple stores of notifications, e.g.: one for read notifications and another for unread. To achieve it define each store as shown in the example:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MagicBellProvider } from '@magicbell/react-headless';

ReactDOM.render(
  <MagicBellProvider
    apiKey={MAGICBELL_API_KEY}
    userEmail="john@example.com"
    stores=[{ id: 'read', context: { read: true }}, { id: 'unread', context: { read: false }}]>
    <App />
  </MagicBellProvider>,
  document.body,
);
```

As shown above, each store is defined with an `id` and a `context`, which will be used to fetch from the MagicBell API.

## useBell

This a hook to get the number of unseen or unread notification since the current user's last visit.

```javascript
import { observer, useBell } from '@magicbell/react-headless';

const NotificationsList = observer(() => ({
  const { badgeCounter, markAllAsSeen } = useBell();

  return (
    <button onClick={markAllAsSeen}>
      <span>{badgeCounter}</span>
      <svg></svg>
    </button>
  );
});
```

The number will be updated in realtime when new notifications arrive.

By default it returns the number of unseen notifications, but you can also fetch the number of unread notifications:

```javascript
import { useBell } from '@magicbell/react-headless';
const { badgeCounter, markAllAsSeen } = useBell({ counter: 'unread' });
```

And if you have multiple notifications stores, you can specify which one to fetch notifications from:

```javascript
import { useBell } from '@magicbell/react-headless';
const { badgeCounter, markAllAsSeen } = useBell({ storeId: 'mentions', counter: 'unread' });
```

## useMagicBellEvent

This a hook to listen to realtime events.

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

## useNotifications

Hook to get notifications for the current authenticated user. Returns a [`NotificationStore`](#the-notification-store).

```javascript
import { observer, useNotifications } from '@magicbell/react-headless';

const NotificationsList = observer(() => ({
  const store = useNotifications();

  return (
    <ul>
      {store.items.map((notification) => (
        <li>{notification.title}</li>
      ))}
    </ul>
  );
});
```

You can optionally provide a name for the store you want to get, e.g.:

```javascript
import { useNotifications } from '@magicbell/react-headless';
const store = useNotifications('mentions');
```

## The notification store

The `NotificationStore` class implements this interface:

```typescript
interface INotificationStore {
  // Attributes
  unseenCount: number;
  unreadCount: number;
  total: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  items: Notification[];

  // Read only properties
  length: number;
  isEmpty: boolean;
  hasNextPage: boolean;

  // Methods
  at: (number) => Notification | null;
  get: (id) => Notification;
  find: (fn) => Notification;
  filter: (fn) => Notification[];
  map: (fn) => any[];
  push: (notification) => void;
  remove: (notification) => void;

  fetch: (queryParams, options = { reset: false }) => Promise;
  fetchNextPage: (queryParams) => Promise;
  create: (data) => Promise<Notification>;
  markAllAsRead: () => Promise;
  markAllAsSeen: () => Promise;
}
```

All attributes are MobX observables.

_TIP:_ You can import this class from `@magicbell/react-headless`. However, you may want to access the notifications store through the [`MagicBellContext`](#magicbellcontext), instead of creating a new instance in your app.

#### `length`

Number of notifications in the `items` array.

#### `at`

Get a notification from the `items` array, specified by index.

#### `map`

Creates an array of values by running each notification in `items` array thru iteratee. The iteratee is invoked with three arguments: `(notification, index, itemsArray)`.

#### `find`

Returns the first notification the given predicate returns truthy for.

#### `filter`

Returns an array of all notifications the given predicate returns truthy for.

#### `fetch`

Fetch notifications from the magicbell server. The pagination data is also updated. The provided query parameters are included in the request to the server.

The response is appended to the current array of notifications, so it can be used as the view model for an infinite scroll list. If you want to reset the collection instead, pass the `reset: true` option to this method:

```js
notifications.fetch({ page: 2 }, { reset: true });
```

#### `fetchNextPage`

This method is simply wrapping the `fetch` method, sending as a parameter the next page of notifications. You can include query parameters to this method.

#### `create`

Create a new notification.

It is equivalent to creating a `Notification` instance with some attributes, saving the notification to the server, and adding it to the array of `items` after being successfully created.

#### `markAllAsRead`

Makes a POST request to the read notifications API endpoint. It also marks all notifications in the collection as read.

#### `markAllAsSeen`

Makes a POST request to the seen notifications API endpoint. It also sets the `unseenCount` to 0 and marks all notifications in the collection as seen.

#### `remove`

Removes the given notification from the `items` array. It does not make any request to the server. If you want to delete a notification, use the `delete` method of the notification object instead.
