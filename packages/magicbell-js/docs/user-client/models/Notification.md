# Notification

**Properties**

| Name             | Type   | Required | Description                                             |
| :--------------- | :----- | :------- | :------------------------------------------------------ |
| createdAt        | string | ✅       | The timestamp when the notification was created.        |
| id               | string | ✅       | The unique identifier for the notification.             |
| title            | string | ✅       | The title that is displayed to recipients.              |
| updatedAt        | string | ✅       | The timestamp when the notification was last updated.   |
| userId           | string | ✅       | The user that should receive the notification.          |
| actionUrl        | string | ❌       | The link associated with the notification.              |
| archivedAt       | string | ❌       | The timestamp when the notification was archived.       |
| category         | string | ❌       | The category grouping for the notification.             |
| content          | string | ❌       | The body content of the notification.                   |
| customAttributes | any    | ❌       | The custom data stored with the notification.           |
| discardedAt      | string | ❌       | The timestamp when the notification was discarded.      |
| readAt           | string | ❌       | The timestamp when the notification was marked as read. |
| seenAt           | string | ❌       | The timestamp when the notification was seen.           |
| sentAt           | string | ❌       | The timestamp when the notification was sent.           |
| topic            | string | ❌       | The topic for additional classification.                |
