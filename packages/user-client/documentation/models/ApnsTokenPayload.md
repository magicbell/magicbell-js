# ApnsTokenPayload

**Properties**

| Name           | Type                           | Required | Description                                                                                                                                                                       |
| :------------- | :----------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deviceToken    | string                         | ✅       |                                                                                                                                                                                   |
| appId          | string                         | ❌       | (Optional) The bundle identifier of the application that is registering this token. Use this field to override the default identifier specified in the projects APNs integration. |
| installationId | ApnsTokenPayloadInstallationId | ❌       | (Optional) The APNs environment the token is registered for. If none is provided we assume the token is used in `production`.                                                     |

# ApnsTokenPayloadInstallationId

(Optional) The APNs environment the token is registered for. If none is provided we assume the token is used in `production`.

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| DEVELOPMENT | string | ✅       | "development" |
| PRODUCTION  | string | ✅       | "production"  |
