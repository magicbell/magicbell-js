# ArrayWithMetadataOfInboxToken

**Properties**

| Name | Type                                | Required | Description |
| :--- | :---------------------------------- | :------- | :---------- |
| data | ArrayWithMetadataOfInboxTokenData[] | ✅       |             |

# ArrayWithMetadataOfInboxTokenData

**Properties**

| Name     | Type          | Required | Description |
| :------- | :------------ | :------- | :---------- |
| data     | InboxToken    | ✅       |             |
| metadata | DataMetadata1 | ✅       |             |

# DataMetadata1

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| createdAt   | string | ✅       |             |
| id          | string | ✅       |             |
| discardedAt | string | ❌       |             |
| updatedAt   | string | ❌       |             |
