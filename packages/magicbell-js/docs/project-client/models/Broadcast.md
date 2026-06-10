# Broadcast

**Properties**

| Name             | Type              | Required | Description                                                                 |
| :--------------- | :---------------- | :------- | :-------------------------------------------------------------------------- |
| recipients       | [User](User.md)[] | ✅       | A collection of users or filters that determine who receives the broadcast. |
| title            | string            | ✅       | The subject or headline that will be shown to recipients.                   |
| actionUrl        | string            | ❌       | The URL recipients will be directed to when interacting with the broadcast. |
| category         | string            | ❌       | The label used to group broadcasts.                                         |
| content          | string            | ❌       | The body content delivered with the broadcast.                              |
| createdAt        | string            | ❌       | The timestamp when the broadcast was created.                               |
| customAttributes | any               | ❌       | Arbitrary custom data associated with the broadcast.                        |
| id               | string            | ❌       | The unique id for this broadcast.                                           |
| overrides        | Overrides         | ❌       | Channel- or provider-specific values that override the defaults.            |
| status           | BroadcastStatus   | ❌       | The runtime state of the broadcast execution.                               |
| topic            | string            | ❌       | The topic that further classifies the broadcast.                            |

# Overrides

Channel- or provider-specific values that override the defaults.

**Properties**

| Name      | Type              | Required | Description                                                    |
| :-------- | :---------------- | :------- | :------------------------------------------------------------- |
| channels  | OverridesChannels | ❌       | Overrides that are scoped to individual delivery channels.     |
| providers | Providers         | ❌       | Overrides that are scoped to specific providers for a channel. |

# OverridesChannels

Overrides that are scoped to individual delivery channels.

**Properties**

| Name       | Type       | Required | Description                              |
| :--------- | :--------- | :------- | :--------------------------------------- |
| email      | Email      | ❌       | Overrides for email notifications.       |
| inApp      | InApp      | ❌       | Overrides for in-app notifications.      |
| mobilePush | MobilePush | ❌       | Overrides for mobile push notifications. |
| sms        | Sms        | ❌       | Overrides for SMS notifications.         |

# Email

Overrides for email notifications.

**Properties**

| Name      | Type   | Required | Description                                                 |
| :-------- | :----- | :------- | :---------------------------------------------------------- |
| actionUrl | string | ❌       | The link associated with the channel-specific notification. |
| content   | string | ❌       | The channel-specific content.                               |
| title     | string | ❌       | The channel-specific title.                                 |

# InApp

Overrides for in-app notifications.

**Properties**

| Name      | Type   | Required | Description                                                 |
| :-------- | :----- | :------- | :---------------------------------------------------------- |
| actionUrl | string | ❌       | The link associated with the channel-specific notification. |
| content   | string | ❌       | The channel-specific content.                               |
| title     | string | ❌       | The channel-specific title.                                 |

# MobilePush

Overrides for mobile push notifications.

**Properties**

| Name      | Type   | Required | Description                                                 |
| :-------- | :----- | :------- | :---------------------------------------------------------- |
| actionUrl | string | ❌       | The link associated with the channel-specific notification. |
| content   | string | ❌       | The channel-specific content.                               |
| title     | string | ❌       | The channel-specific title.                                 |

# Sms

Overrides for SMS notifications.

**Properties**

| Name      | Type   | Required | Description                                                 |
| :-------- | :----- | :------- | :---------------------------------------------------------- |
| actionUrl | string | ❌       | The link associated with the channel-specific notification. |
| content   | string | ❌       | The channel-specific content.                               |
| title     | string | ❌       | The channel-specific title.                                 |

# Providers

Overrides that are scoped to specific providers for a channel.

**Properties**

| Name     | Type | Required | Description                                                      |
| :------- | :--- | :------- | :--------------------------------------------------------------- |
| apns     | any  | ❌       | Provider-specific overrides for Apple Push Notification service. |
| expo     | any  | ❌       | Provider-specific overrides for Expo push notifications.         |
| fcm      | any  | ❌       | Provider-specific overrides for Firebase Cloud Messaging.        |
| mailgun  | any  | ❌       | Provider-specific overrides for Mailgun.                         |
| sendgrid | any  | ❌       | Provider-specific overrides for Sendgrid.                        |
| ses      | any  | ❌       | Provider-specific overrides for AWS SES.                         |
| slack    | any  | ❌       | Provider-specific overrides for Slack.                           |
| teams    | any  | ❌       | Provider-specific overrides for Microsoft Teams.                 |
| twilio   | any  | ❌       | Provider-specific overrides for Twilio.                          |
| webPush  | any  | ❌       | Provider-specific overrides for the web push provider.           |

# BroadcastStatus

The runtime state of the broadcast execution.

**Properties**

| Name    | Type                  | Required | Description                                                  |
| :------ | :-------------------- | :------- | :----------------------------------------------------------- |
| errors  | [Errors](Errors.md)[] | ✅       | A list of errors encountered while processing the broadcast. |
| status  | StatusStatus          | ✅       | The overall processing status of the broadcast.              |
| summary | Summary               | ✅       | The summary counts for total recipients and failures.        |

# StatusStatus

The overall processing status of the broadcast.

**Properties**

| Name       | Type   | Required | Description  |
| :--------- | :----- | :------- | :----------- |
| ENQUEUED   | string | ✅       | "enqueued"   |
| PROCESSING | string | ✅       | "processing" |
| PROCESSED  | string | ✅       | "processed"  |

# Summary

The summary counts for total recipients and failures.

**Properties**

| Name     | Type   | Required | Description                                              |
| :------- | :----- | :------- | :------------------------------------------------------- |
| failures | number | ✅       | The number of failures while processing the broadcast.   |
| total    | number | ✅       | The number of recipients that the broadcast was sent to. |
