# Broadcast

**Properties**

| Name             | Type      | Required | Description |
| :--------------- | :-------- | :------- | :---------- |
| recipients       | any[]     | ✅       |             |
| title            | string    | ✅       |             |
| actionUrl        | string    | ❌       |             |
| category         | Category  | ❌       |             |
| content          | string    | ❌       |             |
| customAttributes | any       | ❌       |             |
| overrides        | Overrides | ❌       |             |
| topic            | Topic     | ❌       |             |

# Category

# Overrides

**Properties**

| Name      | Type      | Required | Description |
| :-------- | :-------- | :------- | :---------- |
| channels  | Channels  | ❌       |             |
| providers | Providers | ❌       |             |

# Channels

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

# Topic
