# FcmToken

**Properties**

| Name           | Type                   | Required | Description |
| :------------- | :--------------------- | :------- | :---------- |
| createdAt      | string                 | ✅       |             |
| deviceToken    | string                 | ✅       |             |
| id             | string                 | ✅       |             |
| discardedAt    | string                 | ❌       |             |
| installationId | FcmTokenInstallationId | ❌       |             |
| updatedAt      | string                 | ❌       |             |

# FcmTokenInstallationId

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| DEVELOPMENT | string | ✅       | "development" |
| PRODUCTION  | string | ✅       | "production"  |
