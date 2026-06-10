# ApnsConfigPayload

**Properties**

| Name           | Type           | Required | Description                                                                                                                                                                                            |
| :------------- | :------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appId          | string         | ✅       | The default bundle identifier of the application that is configured with this project. It can be overriden on a per token basis, when registering device tokens.                                       |
| badge          | Badge          | ✅       | Controls whether the app icon badge counts unread or unseen notifications.                                                                                                                             |
| certificate    | string         | ✅       | The APNs certificate in P8 format. Generate it at [developer.apple.com](https://developer.apple.com/account/resources/authkeys/add) with the 'Apple Push Notification service (APNs)' option selected. |
| keyId          | string         | ✅       | The 10-character Key ID from your Apple Developer account used with the P8 certificate.                                                                                                                |
| teamId         | string         | ✅       | The Apple Developer Team ID that owns the configured key.                                                                                                                                              |
| payloadVersion | PayloadVersion | ❌       | Internal payload format version used by MagicBell.                                                                                                                                                     |

# Badge

Controls whether the app icon badge counts unread or unseen notifications.

**Properties**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| UNREAD | string | ✅       | "unread"    |
| UNSEEN | string | ✅       | "unseen"    |

# PayloadVersion

Internal payload format version used by MagicBell.

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| \_1  | string | ✅       | "1"         |
| \_2  | string | ✅       | "2"         |
