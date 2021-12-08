[![codecov](https://codecov.io/gh/magicbell-io/magicbell-react/branch/main/graph/badge.svg?token=T3u1e0sLpC)](https://codecov.io/gh/magicbell-io/magicbell-react)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/magicbell-react@latest)](https://bundlephobia.com/result?p=@magicbell/magicbell-react)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/magicbell-react@latest)](https://bundlephobia.com/result?p=@magicbell/magicbell-react)
[![npm version](https://badgen.net/npm/v/@magicbell/magicbell-react)](https://www.npmjs.com/package/@magicbell/magicbell-react)

# MagicBell-React

This package contains React components to build a notification inbox for your site powered by [MagicBell](https://magicbell.com).

- Immutable
- Full [TypeScript](https://www.typescriptlang.org/) support
- Supports [preact](https://preactjs.com)
- Requires React 16.8+

## Quick Start

```sh
npm i @magicbell/magicbell-react
# or
yarn add @magicbell/magicbell-react
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    {(props) => <FloatingNotificationInbox height={300} {...props} />}
  </MagicBell>,
  document.body,
);
```

[Check the storybook](https://magicbell-react.netlify.app) to explore all components.

[Notifications page demo](https://codesandbox.io/s/notification-page-y6c49).

## Table of Contents

- Components

  - [MagicBell](#magicbell)
  - [MagicBellProvider](#magicbellprovider)
  - [NotificationInbox](#notificationinbox)
  - [FloatingNotificationInbox](#floatingnotificationinbox)
  - [NotificationList](#notificationlist)
  - [ClickableNotification](#clickablenotification)
  - [NotificationContent](#notificationcontent)

- Hooks

  - [useMagicBellEvent](#usemagicbellevent)
  - [useNotifications](#usenotifications)

- [Custom Themes](#custom-themes)
- [The notification model](#the-notification-model)
- [The notification store](#the-notification-store)

## MagicBell

The `MagicBell` component is the default export of this package and is the root component for building a notification inbox. It initializes a connection to the [MagicBell](https://magicbell.com) server, renders a bell icon with the number of unseen notifications and keeps the data updated in real time.

[Demo](https://codesandbox.io/s/elastic-northcutt-9pcgv)

These are all the properties accepted by this component.

| Property            | Type                                               | Description                                                                                                                                                                  |
| ------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`            | `string`                                           | The API key of your magicbell.io project                                                                                                                                     |
| `userEmail`         | `string`                                           | The email of the user you want to show notifications for                                                                                                                     |
| `userExternalId`    | `string`                                           | The external ID of the user you want to show notifications for. See [the Users documentation](https://developer.magicbell.io/docs/core-concepts#users) for more information. |
| `userKey`           | `string`                                           | The HMAC for the user. It is recommended to enable HMAC authentication but not required                                                                                      |
| `children`          | `({ isOpen, toggle, launcherRef }) => JSX.Element` | The children function to render a list of notifications for the user                                                                                                         |
| `theme`             | `IMagicBellTheme`                                  | An optional object containing custom color values for the widget, see [Custom Themes](#custom-themes)                                                                        |
| `BellIcon`          | `JSX.Element`                                      | An optional react element to be displayed instead of the default bell icon                                                                                                   |
| `defaultIsOpen`     | `boolean`                                          | An optional flag to set the default visibility state of the element returned by the children function. It is `false` by default.                                             |
| `onNewNotification` | `(notification) => void`                           | An optional function called when a new notification arrives.                                                                                                                 |
| `onToggle`          | `(isOpen) => void`                                 | An optional function called when the bell is clicked.                                                                                                                        |
| `bellCounter`       | `string`                                           | Counter to show in the bell. If set to 'unread' it will show the number of unread notifications. It is set to 'unseen' by default.                                           |

### Children function

This component expects a children function. This is how you render whatever you want to based on the state of the `MagicBell`.

You can use the notification inbox from this package (see [`NotificationInbox`](#notificationinbox)):

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell, { NotificationInbox } from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    {() => <NotificationInbox height={300} />}
  </MagicBell>,
  document.body,
);
```

or use your own:

<!-- prettier-ignore -->
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    {({ launcherRef, isOpen, toggle }) => (
      <MyOwnNotificationInbox toggle={toggle} isOpen={isOpen} launcherRef={launcherRef} />
    )}
  </MagicBell>,
  document.body,
);
```

The `MagicBell` component does not render the component returned by the children function by default, only the bell is rendered. When the bell is clicked, the child component is toggled. This behaviour can be changed using the `defaultIsOpen` flag.

As shown above, the children function gets a function to manually toggle the notification inbox. You can access the notifications store through [`MagicBellContext`](#magicbellcontext) or using the `useMagicBellContext` hook.

```javascript
import { useMagicBellContext } from '@magicbell/magicbell-react';
const { rootStore } = useMagicBellContext();
```

**Tip:** Initialize a MagicBell instance with a custom stores definition to render an inbox with two or more filtered lists:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell, { NotificationList } from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBell
    apiKey={MAGICBELL_API_KEY}
    userEmail="john@example.com"
    stores=[{ id: 'read', context: { read: true }}, { id: 'unread', context: { read: false }}]>
    {(props) => (
      <>
        <NotificationList {...props} storeId="read" />
        <NotificationList {...props} storeId="unread" />
      </>
    )}
  </MagicBell>,
  document.body,
);
```

## MagicBellProvider

The `MagicBellProvider` component is the main component for building a custom notification inbox. It initializes a connection to [magicbell.io](https://magicbell.io), creates a `MagicBellContext` and keeps the list of notifications updated in real time.

This is a headless component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { MagicBellProvider } from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBellProvider apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    <App />
  </MagicBellProvider>,
  document.body,
);
```

`MagicBellProvider` creates a React context object, so now you can access the `MagicBellContext` anywhere in your application.

These are all the properties accepted by this component.

| Property         | Type              | Description                                                                                                                                                                  |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`         | `string`          | The API key of your magicbell.io project                                                                                                                                     |
| `userEmail`      | `string`          | The email of the user you want to show notifications for                                                                                                                     |
| `userExternalId` | `string`          | The external ID of the user you want to show notifications for. See [the Users documentation](https://developer.magicbell.io/docs/core-concepts#users) for more information. |
| `userKey`        | `string`          | The HMAC for the user. It is recommended to enable HMAC authentication but not required                                                                                      |
| `children`       | `JSX.Element`     | The children to be wrapped in a `MagicBellContext.Provider`                                                                                                                  |
| `theme`          | `IMagicBellTheme` | An optional object containing custom color values for the widget, see [Custom Themes](#custom-themes)                                                                        |
| `stores`         | `object[]`        | An optional object containing the definitions of the notification stores to create.                                                                                          |

## NotificationInbox

The `NotificationInbox` component renders a header, a footer and an infinite scroll list of notifications.

These are all the properties accepted by this component.

| Property              | Type                                             | Description                                                                                                                       |
| --------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `height`              | `number`                                         | Optional height (in pixels) of the infinite scroll list                                                                           |
| `onAllRead`           | `() => void`                                     | An optional callback function invoked when the "Mark All Read" button is clicked                                                  |
| `onNotificationClick` | `(notification) => void`                         | An optional callback function invoked when a notification is clicked                                                              |
| `storeId`             | `string`                                         | ID of the store to render (optional)                                                                                              |
| `NotificationItem`    | `({ notification, onItemClick }) => JSX.Element` | An optional custom component to use for rendering each notification. Defaults to [ClickableNotification](#clickablenotification). |

If the store wasn't fetched previously, this component will fetch the first page on mounted.

## FloatingNotificationInbox

This component renders a `NotificationInbox` component in a tooltip. The tooltip is created with [popper](https://popper.js.org).

These are all the properties accepted by this component.

| Property                   | Type                                             | Description                                                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`                   | `boolean`                                        | Whether the notification inbox is open (visible) or not                                                                                                                                                                                                              |
| `toggle`                   | `() => void`                                     | Optional function to toggle the notification inbox                                                                                                                                                                                                                   |
| `launcherRef`              | `React.RefObject`                                | React ref pointing to the element that toggles the notification inbox                                                                                                                                                                                                |
| `placement`                | `string`                                         | Position of the notification inbox relative to the launcher. It can be one of these: "auto", "auto-start", "auto-end", "top", "bottom", "right", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end". |
| `width`                    | `number`                                         | Optional width (in pixels) of the list of notifications. Defaults to 500.                                                                                                                                                                                            |
| `height`                   | `number`                                         | Optional height (in pixels) of the list of notifications. Defaults to the window height.                                                                                                                                                                             |
| `onAllRead`                | `() => void`                                     | An optional callback function invoked when the "Mark All Read" button is clicked                                                                                                                                                                                     |
| `onNotificationClick`      | `(notification) => void`                         | An optional callback function invoked when a notification is clicked                                                                                                                                                                                                 |
| `closeOnClickOutside`      | `boolean`                                        | Whether to close the inbox when the user clicks outside of it or not. Defaults to true.                                                                                                                                                                              |
| `closeOnNotificationClick` | `boolean`                                        | Whether to close the inbox when the user clicks on a notification or not. Defaults to true.                                                                                                                                                                          |
| `hideArrow`                | `boolean`                                        | Whether to hide the pointing arrow or not. Defaults to false.                                                                                                                                                                                                        |
| `NotificationItem`         | `({ notification, onItemClick }) => JSX.Element` | An optional custom component to use for rendering each notification. Defaults to [ClickableNotification](#clickablenotification).                                                                                                                                    |

## NotificationList

The `NotificationList` component renders an infinite scroll list of notifications. When the user scrolls to the bottom the next page of notifications are fetched and appended to the current array of notifications. By default it renders a [`ClickableNotification`](#clickablenotification) component for each item in the notifications store.

These are all the properties accepted by this component.

| Property        | Type                                             | Description                                                                                                                  |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `height`        | `number`                                         | Height in pixels of the infinite scroll list                                                                                 |
| `onItemClick`   | `(notification) => void`                         | An optional callback function invoked when a notification is clicked                                                         |
| `ListItem`      | `({ notification, onItemClick }) => JSX.Element` | An optional custom component to use for each item in the list                                                                |
| `notifications` | `NotificationStore`                              | A store of notifications to render                                                                                           |
| `queryParams`   | `object`                                         | An object with some query parameters to fetch the list. Do not include the page to fetch as this is handled by the component |

If the height property is not provided, then the window scroll will be used.

Example: [notification inbox with a custom list item](https://codesandbox.io/s/busy-brahmagupta-v81p7?file=/src/MyNotificationCenter.js).

## ClickableNotification

This component renders the title and content of a notification.

These are all the properties accepted by this component.

| Property       | Type                     | Description                                                         |
| -------------- | ------------------------ | ------------------------------------------------------------------- |
| `notification` | `Notification`           | The [notification](#the-notification-model) object                  |
| `onClick`      | `(notification) => void` | An optional callback function invoked when the component is clicked |

**IMPORTANT:** When a notification is clicked, the notification is marked as read. If you implement your own component, you might also want to mark the notification as read manually. E.g.:

```javascript
import React from 'react';
import { useNotification } from '@magicbell/magicbell-react';

export default function CustomNotification({ notification: data, onClick }) {
  const notification = useNotification(data);
  const handleClick = () => {
    notification.markAsRead();
    onClick(notification);
  };

  return <div onClick={handleClick}>{notification.title}</div>;
}
```

## NotificationContent

This component compiles the notification's `content` using the [Liquid](https://shopify.github.io/liquid/) template language and renders the result. The output is sanitized to prevent XSS attacks.

These are all the properties accepted by this component.

| Property       | Type           | Description                                        |
| -------------- | -------------- | -------------------------------------------------- |
| `notification` | `Notification` | The [notification](#the-notification-model) object |

TIP: If the content has a `time` tag with the `datetime` attribute, the content of this tag will be replaced with a relative time. For example, `<time datetime="2021-06-10T03:00:00Z">on Jun 10</time>` will be replaced with `<time>in 3 months</time>`.

## useMagicBellEvent

This a hook to listen to realtime events.

```javascript
import { useMagicBellEvent } from '@magicbell/magicbell-react';

useMagicBellEvent('notifications.new', showPushNotification);
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
import { useNotifications } from '@magicbell/magicbell-react';

function NotificationsList() {
  const store = useNotifications();

  return (
    <ul>
      {store.notifications.map((notification) => (
        <li>{notification.title}</li>
      ))}
    </ul>
  );
}
```

You can optionally provide a name for the store you want to get, e.g.:

```javascript
import { useNotifications } from '@magicbell/magicbell-react';
const store = useNotifications('mentions');
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

You can override any attribute of this theme. Colors can be expressed in HEX, HSL, HSV or RGB(A).

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell, { NotificationInbox } from '@magicbell/magicbell-react';

const customTheme = {
  icon: {
    borderColor: 'rgba(160, 30, 120, 0.5)',
  },
  header: {
    borderRadius: '2px',
  },
  footer: {
    borderRadius: '2px',
  },
};

ReactDOM.render(
  <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com" theme={customTheme}>
    {() => <NotificationInbox height={500} />}
  </MagicBell>,
  document.body,
);
```

## The notification model

The `Notification` class can be imported from `@magicbell/magicbell-react`. It implements this interface.

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

#### `seenAtDate`

A date representation of the `seenAt` attribute. It returns an immutable instance of Dayjs. [Dayjs](https://day.js.org) exposes an API similar to moment.js.

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

Fetches the notification from the magicbell.io server. All fetched attributes are assigned to the current object.

#### `markAsRead`

This method makes a POST request to the read notification API endpoint of magicbell.io. It sets the `readAt` attribute as well.

#### `markAsUnread`

This method makes a POST request to the unread notification API endpoint of magicbell.io. It sets the `readAt` attribute to `null` as well.

#### `delete`

This method makes a DELETE request to the notification API endpoint of magicbell.io. If the notification belongs to a store, it will remove itself from the store.

## The notification store

The `NotificationStore` class implements this interface:

```typescript
interface INotificationStore {
  unseenCount: number;
  unreadCount: number;
  total: number;
  perPage: number;
  totalPages: number;
  currentPage: number;
  notifications: Notification[];

  length: number;
  isEmpty: boolean;
  hasNextPage: boolean;

  fetch: (queryParams, options = { reset: false }) => Promise;
  fetchNextPage: (queryParams) => Promise;
  markAllAsRead: () => Promise;
  markAllAsSeen: () => Promise;
}
```

_TIP:_ You can import this class from `@magicbell/magicbell-react`. However, you may want to access he notifications store through the [`MagicBellContext`](#magicbellcontext), instead of creating a new instance in your app.

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
