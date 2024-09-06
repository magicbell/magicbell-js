# ArrayWithMetadataOfFcmToken

**Properties**

| Name | Type                              | Required | Description |
| :--- | :-------------------------------- | :------- | :---------- |
| data | ArrayWithMetadataOfFcmTokenData[] | ✅       |             |

# ArrayWithMetadataOfFcmTokenData

**Properties**

| Name     | Type          | Required | Description |
| :------- | :------------ | :------- | :---------- |
| data     | FcmToken      | ✅       |             |
| metadata | DataMetadata3 | ✅       |             |

# DataMetadata3

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
