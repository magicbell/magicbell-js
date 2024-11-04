# CategoryDeliveryConfig

**Properties**

| Name     | Type                             | Required | Description |
| :------- | :------------------------------- | :------- | :---------- |
| category | string                           | ✅       |             |
| channels | CategoryDeliveryConfigChannels[] | ✅       |             |
| disabled | boolean                          | ❌       |             |

# CategoryDeliveryConfigChannels

**Properties**

| Name     | Type             | Required | Description |
| :------- | :--------------- | :------- | :---------- |
| channel  | ChannelsChannel2 | ✅       |             |
| delay    | number           | ❌       |             |
| disabled | boolean          | ❌       |             |
| if       | string           | ❌       |             |
| priority | number           | ❌       |             |

# ChannelsChannel2

**Properties**

| Name        | Type   | Required | Description   |
| :---------- | :----- | :------- | :------------ |
| IN_APP      | string | ✅       | "in_app"      |
| SLACK       | string | ✅       | "slack"       |
| WEB_PUSH    | string | ✅       | "web_push"    |
| MOBILE_PUSH | string | ✅       | "mobile_push" |
| TEAMS       | string | ✅       | "teams"       |
| EMAIL       | string | ✅       | "email"       |
