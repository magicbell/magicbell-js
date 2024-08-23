# ArrayWithMetadataOfApnsToken

**Properties**

| Name | Type                               | Required | Description |
| :--- | :--------------------------------- | :------- | :---------- |
| data | ArrayWithMetadataOfApnsTokenData[] | ✅       |             |

# ArrayWithMetadataOfApnsTokenData

**Properties**

| Name     | Type          | Required | Description |
| :------- | :------------ | :------- | :---------- |
| data     | ApnsToken     | ✅       |             |
| metadata | DataMetadata2 | ✅       |             |

# DataMetadata2

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
