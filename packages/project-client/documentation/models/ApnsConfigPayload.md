# ApnsConfigPayload

**Properties**

| Name           | Type           | Required | Description                                                                                                                                                                                            |
| :------------- | :------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId          | string         | ✅       | The default bundle identifier of the application that is configured with this project. It can be overriden on a per token basis, when registering device tokens.                                       |
| badge          | Badge          | ✅       |                                                                                                                                                                                                        |
| certificate    | string         | ✅       | The APNs certificate in P8 format. Generate it at [developer.apple.com](https://developer.apple.com/account/resources/authkeys/add) with the 'Apple Push Notification service (APNs)' option selected. |
| keyId          | string         | ✅       |                                                                                                                                                                                                        |
| teamId         | string         | ✅       |                                                                                                                                                                                                        |
| payloadVersion | PayloadVersion | ❌       |                                                                                                                                                                                                        |

# Badge

**Properties**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| UNREAD | string | ✅       | "unread"    |
| UNSEEN | string | ✅       | "unseen"    |

# PayloadVersion

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| \_1  | string | ✅       | "1"         |
| \_2  | string | ✅       | "2"         |
