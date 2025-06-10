# Broadcast

**Properties**

| Name             | Type            | Required | Description                                   |
| :--------------- | :-------------- | :------- | :-------------------------------------------- |
| recipients       | User[]          | ✅       |                                               |
| title            | string          | ✅       |                                               |
| actionUrl        | string          | ❌       |                                               |
| category         | string          | ❌       |                                               |
| content          | string          | ❌       |                                               |
| createdAt        | string          | ❌       | The timestamp when the broadcast was created. |
| customAttributes | any             | ❌       |                                               |
| id               | string          | ❌       | The unique id for this broadcast.             |
| overrides        | Overrides       | ❌       |                                               |
| status           | BroadcastStatus | ❌       |                                               |
| topic            | string          | ❌       |                                               |

# Overrides

**Properties**

| Name      | Type              | Required | Description |
| :-------- | :---------------- | :------- | :---------- |
| channels  | OverridesChannels | ❌       |             |
| providers | Providers         | ❌       |             |

# OverridesChannels

**Properties**

| Name       | Type       | Required | Description |
| :--------- | :--------- | :------- | :---------- |
| email      | Email      | ❌       |             |
| inApp      | InApp      | ❌       |             |
| mobilePush | MobilePush | ❌       |             |
| sms        | Sms        | ❌       |             |

# Email

**Properties**

| Name      | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| actionUrl | string | ❌       |             |
| content   | string | ❌       |             |
| title     | string | ❌       |             |

# InApp

**Properties**

| Name      | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| actionUrl | string | ❌       |             |
| content   | string | ❌       |             |
| title     | string | ❌       |             |

# MobilePush

**Properties**

| Name      | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| actionUrl | string | ❌       |             |
| content   | string | ❌       |             |
| title     | string | ❌       |             |

# Sms

**Properties**

| Name      | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| actionUrl | string | ❌       |             |
| content   | string | ❌       |             |
| title     | string | ❌       |             |

# Providers

**Properties**

| Name     | Type | Required | Description |
| :------- | :--- | :------- | :---------- |
| apns     | any  | ❌       |             |
| expo     | any  | ❌       |             |
| fcm      | any  | ❌       |             |
| mailgun  | any  | ❌       |             |
| sendgrid | any  | ❌       |             |
| ses      | any  | ❌       |             |
| slack    | any  | ❌       |             |
| teams    | any  | ❌       |             |
| twilio   | any  | ❌       |             |
| webPush  | any  | ❌       |             |

# BroadcastStatus

**Properties**

| Name    | Type         | Required | Description |
| :------ | :----------- | :------- | :---------- |
| errors  | Errors[]     | ✅       |             |
| status  | StatusStatus | ✅       |             |
| summary | Summary      | ✅       |             |

# Errors

**Properties**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| message | string | ❌       |             |

# StatusStatus

**Properties**

| Name       | Type   | Required | Description  |
| :--------- | :----- | :------- | :----------- |
| ENQUEUED   | string | ✅       | "enqueued"   |
| PROCESSING | string | ✅       | "processing" |
| PROCESSED  | string | ✅       | "processed"  |

# Summary

**Properties**

| Name     | Type   | Required | Description                                              |
| :------- | :----- | :------- | :------------------------------------------------------- |
| failures | number | ✅       | The number of failures while processing the broadcast.   |
| total    | number | ✅       | The number of recipients that the broadcast was sent to. |
