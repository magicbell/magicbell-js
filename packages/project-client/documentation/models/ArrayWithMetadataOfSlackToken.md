# ArrayWithMetadataOfSlackToken

**Properties**

| Name | Type                                  | Required | Description |
| :--- | :------------------------------------ | :------- | :---------- |
| data | `ArrayWithMetadataOfSlackTokenData[]` | ✅       |             |

# ArrayWithMetadataOfSlackTokenData

**Properties**

| Name     | Type            | Required | Description |
| :------- | :-------------- | :------- | :---------- |
| data     | `SlackToken`    | ✅       |             |
| metadata | `DataMetadata4` | ✅       |             |

# DataMetadata4

**Properties**

| Name        | Type     | Required | Description |
| :---------- | :------- | :------- | :---------- |
| createdAt   | `string` | ✅       |             |
| id          | `string` | ✅       |             |
| discardedAt | `string` | ❌       |             |
| updatedAt   | `string` | ❌       |             |
