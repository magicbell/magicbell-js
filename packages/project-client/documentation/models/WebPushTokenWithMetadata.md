# WebPushTokenWithMetadata

**Properties**

| Name     | Type                             | Required | Description |
| :------- | :------------------------------- | :------- | :---------- |
| data     | WebPushToken                     | ✅       |             |
| metadata | WebPushTokenWithMetadataMetadata | ✅       |             |

# WebPushTokenWithMetadataMetadata

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
