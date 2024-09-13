# ArrayWithMetadataOfWebPushToken

**Properties**

| Name | Type                                    | Required | Description |
| :--- | :-------------------------------------- | :------- | :---------- |
| data | `ArrayWithMetadataOfWebPushTokenData[]` | ✅       |             |

# ArrayWithMetadataOfWebPushTokenData

**Properties**

| Name     | Type            | Required | Description |
| :------- | :-------------- | :------- | :---------- |
| data     | `WebPushToken`  | ✅       |             |
| metadata | `DataMetadata6` | ✅       |             |

# DataMetadata6

**Properties**

| Name        | Type     | Required | Description |
| :---------- | :------- | :------- | :---------- |
| createdAt   | `string` | ✅       |             |
| id          | `string` | ✅       |             |
| discardedAt | `string` | ❌       |             |
| updatedAt   | `string` | ❌       |             |
