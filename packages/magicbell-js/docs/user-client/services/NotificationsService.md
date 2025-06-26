# NotificationsService

A list of all methods in the `NotificationsService` service. Click on the method name to view detailed information about that method.

| Methods                                               | Description                         |
| :---------------------------------------------------- | :---------------------------------- |
| [listNotifications](#listnotifications)               | Lists all notifications for a user. |
| [archiveAllNotifications](#archiveallnotifications)   | Archive all notifications.          |
| [markAllNotificationsRead](#markallnotificationsread) | Marks all notifications as read.    |
| [fetchNotification](#fetchnotification)               | Gets a notification by ID.          |
| [archiveNotification](#archivenotification)           | Archive a notification.             |
| [markNotificationRead](#marknotificationread)         | Marks a notification as read.       |
| [unarchiveNotification](#unarchivenotification)       | Unarchives a notification.          |
| [markNotificationUnread](#marknotificationunread)     | Marks a notification as unread.     |

## listNotifications

Lists all notifications for a user.

- HTTP Method: `GET`
- Endpoint: `/notifications`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |
| status        | string | ❌       |             |
| category      | string | ❌       |             |
| topic         | string | ❌       |             |

**Return Type**

`NotificationCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.listNotifications({
    limit: 8,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
    status: 'status',
    category: 'category',
    topic: 'topic',
  });

  console.log(data);
})();
```

## archiveAllNotifications

Archive all notifications.

- HTTP Method: `POST`
- Endpoint: `/notifications/archive`

**Parameters**

| Name     | Type   | Required | Description |
| :------- | :----- | :------- | :---------- |
| category | string | ❌       |             |
| topic    | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.archiveAllNotifications({
    category: 'category',
    topic: 'topic',
  });

  console.log(data);
})();
```

## markAllNotificationsRead

Marks all notifications as read.

- HTTP Method: `POST`
- Endpoint: `/notifications/read`

**Parameters**

| Name     | Type   | Required | Description |
| :------- | :----- | :------- | :---------- |
| category | string | ❌       |             |
| topic    | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.markAllNotificationsRead({
    category: 'category',
    topic: 'topic',
  });

  console.log(data);
})();
```

## fetchNotification

Gets a notification by ID.

- HTTP Method: `GET`
- Endpoint: `/notifications/{notification_id}`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Return Type**

`Notification`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.fetchNotification('notification_id');

  console.log(data);
})();
```

## archiveNotification

Archive a notification.

- HTTP Method: `POST`
- Endpoint: `/notifications/{notification_id}/archive`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.archiveNotification('notification_id');

  console.log(data);
})();
```

## markNotificationRead

Marks a notification as read.

- HTTP Method: `POST`
- Endpoint: `/notifications/{notification_id}/read`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.markNotificationRead('notification_id');

  console.log(data);
})();
```

## unarchiveNotification

Unarchives a notification.

- HTTP Method: `POST`
- Endpoint: `/notifications/{notification_id}/unarchive`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.unarchiveNotification('notification_id');

  console.log(data);
})();
```

## markNotificationUnread

Marks a notification as unread.

- HTTP Method: `POST`
- Endpoint: `/notifications/{notification_id}/unread`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.markNotificationUnread('notification_id');

  console.log(data);
})();
```
