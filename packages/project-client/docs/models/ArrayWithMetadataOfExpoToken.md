# ArrayWithMetadataOfExpoToken

**Properties**

| Name | Type                               | Required | Description |
| :--- | :--------------------------------- | :------- | :---------- |
| data | ArrayWithMetadataOfExpoTokenData[] | ✅       |             |

# ArrayWithMetadataOfExpoTokenData

**Properties**

| Name     | Type          | Required | Description |
| :------- | :------------ | :------- | :---------- |
| data     | ExpoToken     | ✅       |             |
| metadata | DataMetadata2 | ✅       |             |

# DataMetadata2

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
