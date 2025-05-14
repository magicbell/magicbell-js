# NotificationsService

A list of all methods in the `NotificationsService` service. Click on the method name to view detailed information about that method.

| Methods                                           | Description                         |
| :------------------------------------------------ | :---------------------------------- |
| [listNotifications](#listnotifications)           | Lists all notifications for a user. |
| [archiveNotification](#archivenotification)       | Archives a notification.            |
| [markNotificationRead](#marknotificationread)     | Marks a notification as read.       |
| [unarchiveNotification](#unarchivenotification)   | Unarchives a notification.          |
| [markNotificationUnread](#marknotificationunread) | Marks a notification as unread.     |

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
| topic         | string | ❌       |             |

**Return Type**

`NotificationCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.listNotifications({
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
    status: 'status',
    topic: 'topic',
  });

  console.log(data);
})();
```

## archiveNotification

Archives a notification.

- HTTP Method: `POST`
- Endpoint: `/notifications/{notification_id}/archive`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

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
import { Client } from '@magicbell/user-client';

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
import { Client } from '@magicbell/user-client';

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.notifications.markNotificationUnread('notification_id');

  console.log(data);
})();
```
