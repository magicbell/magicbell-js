# CategoryDeliveryConfig

**Properties**

| Name     | Type                             | Required | Description |
| :------- | :------------------------------- | :------- | :---------- |
| channels | CategoryDeliveryConfigChannels[] | ✅       |             |
| key      | string                           | ✅       |             |
| disabled | boolean                          | ❌       |             |

# CategoryDeliveryConfigChannels

**Properties**

| Name    | Type    | Required | Description |
| :------ | :------ | :------- | :---------- |
| channel | Channel | ✅       |             |
| delay   | number  | ❌       |             |
| if      | string  | ❌       |             |

# Channel

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
