# NotificationsService

A list of all methods in the `NotificationsService` service. Click on the method name to view detailed information about that method.

| Methods                                 | Description                                                                                                                                |
| :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| [listNotifications](#listnotifications) | Creates a new broadcast message. When a broadcast is created, it generates individual notifications for relevant users within the project. |

## listNotifications

Creates a new broadcast message. When a broadcast is created, it generates individual notifications for relevant users within the project.

- HTTP Method: `GET`
- Endpoint: `/notifications`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

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
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```
