# ArrayWithMetadataOfTeamsToken

**Properties**

| Name | Type                                | Required | Description |
| :--- | :---------------------------------- | :------- | :---------- |
| data | ArrayWithMetadataOfTeamsTokenData[] | ✅       |             |

# ArrayWithMetadataOfTeamsTokenData

**Properties**

| Name     | Type          | Required | Description |
| :------- | :------------ | :------- | :---------- |
| data     | TeamsToken    | ✅       |             |
| metadata | DataMetadata5 | ✅       |             |

# DataMetadata5

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
