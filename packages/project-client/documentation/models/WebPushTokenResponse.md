# WebPushTokenResponse

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| endpoint    | string | ✅       |             |
| id          | string | ✅       |             |
| keys        | Keys   | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |

# Keys

**Properties**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| auth   | string | ✅       |             |
| p256dh | string | ✅       |             |
