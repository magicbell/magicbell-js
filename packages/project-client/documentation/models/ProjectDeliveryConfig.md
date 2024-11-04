# ProjectDeliveryConfig

**Properties**

| Name     | Type                            | Required | Description |
| :------- | :------------------------------ | :------- | :---------- |
| channels | ProjectDeliveryConfigChannels[] | ✅       |             |

# ProjectDeliveryConfigChannels

**Properties**

| Name     | Type             | Required | Description                                                                       |
| :------- | :--------------- | :------- | :-------------------------------------------------------------------------------- |
| channel  | ChannelsChannel1 | ✅       |                                                                                   |
| delay    | number           | ❌       | Delay (in seconds) since the last step, before the message is sent to the channel |
| disabled | boolean          | ❌       |                                                                                   |
| if       | string           | ❌       |                                                                                   |
| priority | number           | ❌       |                                                                                   |

# ChannelsChannel1

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| IN_APP      | string | ✅       | "in_app"      |
| SLACK       | string | ✅       | "slack"       |
| WEB_PUSH    | string | ✅       | "web_push"    |
| MOBILE_PUSH | string | ✅       | "mobile_push" |
| TEAMS       | string | ✅       | "teams"       |
| EMAIL       | string | ✅       | "email"       |
| SMS         | string | ✅       | "sms"         |
