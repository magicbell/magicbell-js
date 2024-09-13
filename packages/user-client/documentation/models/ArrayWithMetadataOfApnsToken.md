# ArrayWithMetadataOfApnsToken

**Properties**

| Name | Type                                 | Required | Description |
| :--- | :----------------------------------- | :------- | :---------- |
| data | `ArrayWithMetadataOfApnsTokenData[]` | ✅       |             |

# ArrayWithMetadataOfApnsTokenData

**Properties**

| Name     | Type            | Required | Description |
| :------- | :-------------- | :------- | :---------- |
| data     | `ApnsToken`     | ✅       |             |
| metadata | `DataMetadata1` | ✅       |             |

# DataMetadata1

**Properties**

| Name        | Type     | Required | Description |
| :---------- | :------- | :------- | :---------- |
| createdAt   | `string` | ✅       |             |
| id          | `string` | ✅       |             |
| discardedAt | `string` | ❌       |             |
| updatedAt   | `string` | ❌       |             |
