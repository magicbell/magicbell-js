# FcmTokenResponse

**Properties**

| Name           | Type                           | Required | Description |
| :------------- | :----------------------------- | :------- | :---------- |
| createdAt      | string                         | ✅       |             |
| deviceToken    | string                         | ✅       |             |
| id             | string                         | ✅       |             |
| discardedAt    | string                         | ❌       |             |
| installationId | FcmTokenResponseInstallationId | ❌       |             |
| updatedAt      | string                         | ❌       |             |

# FcmTokenResponseInstallationId

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| DEVELOPMENT | string | ✅       | "development" |
| PRODUCTION  | string | ✅       | "production"  |
