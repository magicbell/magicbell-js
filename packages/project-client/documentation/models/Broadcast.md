# Broadcast

**Properties**

| Name             | Type            | Required | Description                                   |
| :--------------- | :-------------- | :------- | :-------------------------------------------- |
| recipients       | any[]           | ✅       |                                               |
| title            | string          | ✅       |                                               |
| actionUrl        | string          | ❌       |                                               |
| category         | Category        | ❌       |                                               |
| content          | string          | ❌       |                                               |
| createdAt        | string          | ❌       | The timestamp when the broadcast was created. |
| customAttributes | any             | ❌       |                                               |
| id               | string          | ❌       | The unique id for this broadcast.             |
| overrides        | Overrides       | ❌       |                                               |
| status           | BroadcastStatus | ❌       |                                               |
| topic            | Topic           | ❌       |                                               |

# Category

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
| slack      | Slack      | ❌       |             |
| sms        | Sms        | ❌       |             |
| webPush    | WebPush    | ❌       |             |

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

# Slack

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

# WebPush

**Properties**

| Name      | Type   | Required | Description |
| :-------- | :----- | :------- | :---------- |
| actionUrl | string | ❌       |             |
| content   | string | ❌       |             |
| title     | string | ❌       |             |

# Providers

**Properties**

| Name      | Type | Required | Description |
| :-------- | :--- | :------- | :---------- |
| amazonSes | any  | ❌       |             |
| android   | any  | ❌       |             |
| ios       | any  | ❌       |             |
| mailgun   | any  | ❌       |             |
| postmark  | any  | ❌       |             |
| sendgrid  | any  | ❌       |             |
| slack     | any  | ❌       |             |

# BroadcastStatus

**Properties**

| Name    | Type         | Required | Description |
| :------ | :----------- | :------- | :---------- |
| errors  | any[]        | ✅       |             |
| status  | StatusStatus | ✅       |             |
| summary | Summary      | ✅       |             |

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

# Topic
