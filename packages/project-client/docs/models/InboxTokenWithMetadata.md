# InboxTokenWithMetadata

**Properties**

| Name     | Type                           | Required | Description |
| :------- | :----------------------------- | :------- | :---------- |
| data     | InboxToken                     | ✅       |             |
| metadata | InboxTokenWithMetadataMetadata | ✅       |             |

# InboxTokenWithMetadataMetadata

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
