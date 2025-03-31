# FcmTokenPayload

**Properties**

| Name           | Type                          | Required | Description |
| :------------- | :---------------------------- | :------- | :---------- |
| deviceToken    | string                        | ✅       |             |
| installationId | FcmTokenPayloadInstallationId | ❌       |             |

# FcmTokenPayloadInstallationId

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| DEVELOPMENT | string | ✅       | "development" |
| PRODUCTION  | string | ✅       | "production"  |
