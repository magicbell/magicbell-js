# CategoryDeliveryPlan

**Properties**

| Name     | Type                           | Required | Description |
| :------- | :----------------------------- | :------- | :---------- |
| category | string                         | ✅       |             |
| channels | CategoryDeliveryPlanChannels[] | ✅       |             |
| disabled | boolean                        | ❌       |             |

# CategoryDeliveryPlanChannels

**Properties**

| Name    | Type             | Required | Description |
| :------ | :--------------- | :------- | :---------- |
| channel | ChannelsChannel2 | ✅       |             |
| delay   | number           | ❌       |             |
| if      | string           | ❌       |             |

# ChannelsChannel2

**Properties**

| Name       | Type   | Required | Description   |
| :--------- | :----- | :------- | :------------ |
| INAPP      | string | ✅       | "in_app"      |
| SLACK      | string | ✅       | "slack"       |
| WEBPUSH    | string | ✅       | "web_push"    |
| MOBILEPUSH | string | ✅       | "mobile_push" |
| TEAMS      | string | ✅       | "teams"       |
| EMAIL      | string | ✅       | "email"       |
