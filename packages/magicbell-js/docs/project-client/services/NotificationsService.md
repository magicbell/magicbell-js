# NotificationsService

A list of all methods in the `NotificationsService` service. Click on the method name to view detailed information about that method.

| Methods                             | Description                               |
| :---------------------------------- | :---------------------------------------- |
| [getDeliveryplan](#getdeliveryplan) | Get the delivery plan for a notification. |

## getDeliveryplan

Get the delivery plan for a notification.

- HTTP Method: `GET`
- Endpoint: `/notifications/{notification_id}/deliveryplan`

**Parameters**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| notificationId | string | ✅       |             |

**Return Type**

`DeliveryPlanCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.notifications.getDeliveryplan('notification_id');

  console.log(data);
})();
```
