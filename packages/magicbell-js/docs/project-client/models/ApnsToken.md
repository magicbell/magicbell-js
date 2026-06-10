# ApnsToken

**Properties**

| Name           | Type           | Required | Description                                                                                                                                      |
| :------------- | :------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| createdAt      | string         | ✅       | The timestamp when the token was created.                                                                                                        |
| deviceToken    | string         | ✅       | The APNs device token to register with MagicBell.                                                                                                |
| id             | string         | ✅       | The unique identifier for the token.                                                                                                             |
| appId          | string         | ❌       | The bundle identifier of the application registering this token. Use this to override the default identifier configured on the APNs integration. |
| discardedAt    | string         | ❌       | The timestamp when the token was discarded, if applicable.                                                                                       |
| installationId | InstallationId | ❌       | The APNs environment this token belongs to. If omitted we assume it targets `production`.                                                        |
| updatedAt      | string         | ❌       | The timestamp when the token metadata last changed.                                                                                              |

# InstallationId

The APNs environment this token belongs to. If omitted we assume it targets `production`.

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| DEVELOPMENT | string | ✅       | "development" |
| PRODUCTION  | string | ✅       | "production"  |
