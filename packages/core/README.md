[![codecov](https://codecov.io/gh/magicbell-io/magicbell-node/branch/main/graph/badge.svg?token=Z2EV4QVGHY)](https://codecov.io/gh/magicbell-io/magicbell-node)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/core@latest)](https://bundlephobia.com/result?p=@magicbell/core)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/core@latest)](https://bundlephobia.com/result?p=@magicbell/core)
[![npm version](https://badgen.net/npm/v/@magicbell/core)](https://www.npmjs.com/package/@magicbell/core)

# Magicbell API wrapper

This is the official [MagicBell](https://magicbell.com) API wrapper for Node and
the browser. You can easily fetch, delete and create notifications.

- Full [TypeScript](https://www.typescriptlang.org/) support

If you are looking to build a notification inbox in React, check our [React hooks package](https://www.npmjs.com/package/@magicbell/magicbell-react)
and the [React package](https://www.npmjs.com/package/@magicbell/magicbell-react).

## Quick Start

First, grab your API key from your [MagicBell dashboard](https://app.magicbell.com).
Then install the package and fetch your notifications.

```sh
npm i @magicbell/core --save
# or
yarn add @magicbell/core
```

```javascript
import MagicBellClient, { NotificationStore } from '@magicbell/core';

const client = await MagicBellClient.createInstance({
  apiKey: 'MAGICBELL_API_KEY',
  userEmail: 'customer@example.com',
});

const notificationsStore = new NotificationStore();
await notificationsStore.fetch();
console.log(`User ${userEmail} has ${notificationsStore.unreadCount} unread notifications.`);
```

[Try a working example](https://codesandbox.io/s/bold-almeida-ndoie?file=/src/index.ts).

## Table of Contents

- [MagicBellClient](#magicbellclient)
  - [Real time events](#real-time-events)
- [Create notifications](#create-notifications)
- [NotificationStore](#notificationstore)
- [Notification](#notification)

## MagicBellClient

Use this class to create a MagicBell client. It configures the AJAX client used to interact with the [magicbell.com](https://magicbell.com) server, fetches the configuration values for your account.

These are the arguments accepted by this function:

| Property         | Type     | Description                                                                             |
| ---------------- | -------- | --------------------------------------------------------------------------------------- |
| `apiKey`         | `string` | The API key of your MagicBell project                                                   |
| `apiSecret`      | `string` | The secret key of your MagicBell project (optional)                                     |
| `userEmail`      | `string` | The email of the user you want to show notifications for                                |
| `userExternalId` | `string` | The id of the user you want to show notifications for                                   |
| `userKey`        | `string` | The HMAC for the user. It is recommended to enable HMAC authentication but not required |

### Real time events

The `MagicBellClient` also handles real time events. You need to start the real
time listener calling the `startRealTimeListener`. This method returns a
function you need call in the cleanup phase of your application to prevent
memory leaks. The listener will emit events to the `pushEventAggregator` object,
which is simple event bus for pub/sub.

```javascript
import MagicBellClient, { pushEventAggregator } from '@magicbell/core';

const client = await MagicBellClient.createInstance({
  apiKey: 'MAGICBELL_API_KEY',
  userEmail: 'customer@example.com',
});

const dispose = client.startRealTimeListener();

pushEventAggregator.on('notifications.new', (notification) => {
  // Do something with the notification
});

dispose();
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

## Create notifications

The simplest way to create a notification is using the `Notification.create`
method:

```javascript
import MagicBellClient, { Notification } from '@magicbell/core';

MagicBellClient.configure({ apiKey: 'MAGICBELL_API_KEY', apiSecret: 'MAGICBELL_API_SECRET' });

const notification = Notification.create({
  title: 'New reply: I want to book a demo',
  content: 'Hi, I would like to book it on Monday, please',
  recipients: [{ email: 'customer@example.com' }],
});
```

Another approach, useful for building UIs, is to create the notification through
a notifications store:

```javascript
import MagicBellClient, { NotificationStore } from '@magicbell/core';

const client = await MagicBellClient.createInstance({
  apiKey: 'MAGICBELL_API_KEY',
  apiSecret: 'MAGICBELL_API_SECRET',
});

const store = new NotificationStore();
const notification = await store.create({
  title: 'New reply: I want to book a demo',
  content: 'Hi, I would like to book it on Monday, please',
  recipients: [{ email: 'customer@example.com' }],
});
```

The new notification will be added to the store of notifications, too.

## Notification

The `Notification` class represents a MagicBell notification. It implements this
interface:

```typescript
interface INotification {
  // Attributes
  id: string | null;
  title: string;
  content: string | null;
  category: string | null;
  actionUrl: string;
  customAttributes: any;
  readAt: number | null;
  seenAt: number | null;
  sentAt: number;

  // Getters/setters
  isRead: boolean;
  isSeen: boolean;

  // Read-only properties
  seenAtDate: Dayjs | null;
  sentAtDate: Dayjs;
  readAtDate: Dayjs | null;

  // Methods
  fetch: () => Promise;
  markAsRead: () => Promise;
  markAsUnread: () => Promise;
  delete: () => Promise;
}
```

All attributes are MobX observables.

#### `seenAtDate`

A date representation of the `seenAt` attribute. It returns an immutable
instance of Dayjs. [Dayjs](https://day.js.org) exposes an API similar to
moment.js.

```javascript
notification.seenAtDate.format('DD/MM/YYYY'); // '01/04/2021'
notification.seenAtDate.fromNow(); // 1mo
notification.seenAtDate.to('2021-01-01'); // in 4mo
notification.seenAtDate.add(2, 'day');
```

#### `readAtDate`

A date representation of the `readAt` attribute. It returns an immutable instance of Dayjs.

#### `sentAtDate`

A date representation of the `sentAt` attribute. It returns an immutable instance of Dayjs.

#### `fetch`

Fetches the notification from the [Magicbell API server](https://magicbell.com/docs/api-reference).
All fetched attributes are assigned to the current object.

#### `markAsRead`

This method makes a POST request to the [read notification API endpoint](https://magicbell.com/docs/api-reference).
It sets the `readAt` attribute as well.

#### `markAsUnread`

This method makes a POST request to the [unread notification API endpoint](https://magicbell.com/docs/api-reference).
It sets the `readAt` attribute to `null` as well.

#### `delete`

This method makes a DELETE request to the [delete notification API endpoint](https://magicbell.com/docs/api-reference).
If the notification belongs to a store, it will remove itself from the store.

## NotificationStore

The `NotificationStore` class represents a collection of [MagicBell](https://magicbell.com)
notifications. It implements this interface:

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

In the following example, we are fetching notifications and marking all of them
as read.

```typescript
let store = new NotificationStore();
await store.fetch();
await store.markAllAsRead();
```

#### `length`

Number of notifications in the `items` array.

#### `at`

Get a notification from the `items` array, specified by index.

#### `map`

Creates an array of values by running each notification in `items` array thru
iteratee. The iteratee is invoked with three arguments: `(notification, index, itemsArray)`.

#### `find`

Returns the first notification the given predicate returns truthy for.

#### `filter`

Returns an array of all notifications the given predicate returns truthy for.

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

#### `create`

Create a new notification.

It is equivalent to creating a `Notification` instance with some attributes,
saving the notification to the [MagicBell](https://magicbell.com) server, and
adding it to the array of `items` after being successfully created.

#### `markAllAsRead`

Makes a POST request to the [read notifications API endpoint](<(https://magicbell.com/docs/api-reference)>).
It also marks all notifications in the collection as read.

#### `markAllAsSeen`

Makes a POST request to the [seen notifications API endpoint](https://magicbell.com/docs/api-reference).
It also sets the `unseenCount` to 0 and marks all notifications in the collection as seen.

#### `remove`

Removes the given notification from the `items` array. It does not make any
request to the server. If you want to delete a notification, use the `delete`
method of the notification object instead.
