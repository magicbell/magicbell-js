# DeliveryPlan

**Properties**

| Name     | Type                   | Required | Description |
| :------- | :--------------------- | :------- | :---------- |
| channels | DeliveryPlanChannels[] | ✅       |             |

# DeliveryPlanChannels

**Properties**

| Name    | Type             | Required | Description |
| :------ | :--------------- | :------- | :---------- |
| channel | ChannelsChannel1 | ✅       |             |
| delay   | number           | ❌       |             |
| if      | string           | ❌       |             |

# ChannelsChannel1

**Properties**

| Name       | Type   | Required | Description   |
| :--------- | :----- | :------- | :------------ |
| INAPP      | string | ✅       | "in_app"      |
| SLACK      | string | ✅       | "slack"       |
| WEBPUSH    | string | ✅       | "web_push"    |
| MOBILEPUSH | string | ✅       | "mobile_push" |
| TEAMS      | string | ✅       | "teams"       |
| EMAIL      | string | ✅       | "email"       |
| SMS        | string | ✅       | "sms"         |
