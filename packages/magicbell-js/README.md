# MagicBell JavaScript SDK

Welcome to the `magicbell-js` SDK documentation. This guide will help you get started with integrating and using the JavaScript SDK in your project.

# Setup & Configuration

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install magicbell-js
```

# ProjectClient

<!-- AUTO-GENERATED-CONTENT:START (project-client) -->

## Authentication

### Access Token Authentication

The Client API uses an Access Token for authentication.

This token must be provided to authenticate your requests to the API.

#### Setting the Access Token

When you initialize the SDK, you can set the access token as follows:

```ts
const sdk = new Client({ token: 'YOUR_TOKEN' });
```

If you need to set or update the access token after initializing the SDK, you can use:

```ts
const sdk = new Client();
sdk.token = 'YOUR_TOKEN';
```

## Setting a Custom Timeout

You can set a custom timeout for the SDK's HTTP requests as follows:

```ts
const client = new Client({ timeout: 10000 });
```

## Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.listBroadcasts({
    limit: 5,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

### Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                                       |
| :------------------------------------------------------------------------- |
| [BroadcastsService](docs/project-client/services/BroadcastsService.md)     |
| [ChannelsService](docs/project-client/services/ChannelsService.md)         |
| [EventsService](docs/project-client/services/EventsService.md)             |
| [IntegrationsService](docs/project-client/services/IntegrationsService.md) |
| [UsersService](docs/project-client/services/UsersService.md)               |

</details>

### Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                       | Description |
| :----------------------------------------------------------------------------------------- | :---------- |
| [BroadcastCollection](docs/project-client/models/BroadcastCollection.md)                   |             |
| [Broadcast](docs/project-client/models/Broadcast.md)                                       |             |
| [User](docs/project-client/models/User.md)                                                 |             |
| [Links](docs/project-client/models/Links.md)                                               |             |
| [CategoryDeliveryConfig](docs/project-client/models/CategoryDeliveryConfig.md)             |             |
| [InboxTokenResponseCollection](docs/project-client/models/InboxTokenResponseCollection.md) |             |
| [InboxTokenResponse](docs/project-client/models/InboxTokenResponse.md)                     |             |
| [Links](docs/project-client/models/Links.md)                                               |             |
| [DiscardResult](docs/project-client/models/DiscardResult.md)                               |             |
| [ApnsTokenCollection](docs/project-client/models/ApnsTokenCollection.md)                   |             |
| [ApnsToken](docs/project-client/models/ApnsToken.md)                                       |             |
| [ExpoTokenCollection](docs/project-client/models/ExpoTokenCollection.md)                   |             |
| [ExpoToken](docs/project-client/models/ExpoToken.md)                                       |             |
| [FcmTokenCollection](docs/project-client/models/FcmTokenCollection.md)                     |             |
| [FcmToken](docs/project-client/models/FcmToken.md)                                         |             |
| [SlackTokenCollection](docs/project-client/models/SlackTokenCollection.md)                 |             |
| [SlackToken](docs/project-client/models/SlackToken.md)                                     |             |
| [TeamsTokenCollection](docs/project-client/models/TeamsTokenCollection.md)                 |             |
| [TeamsToken](docs/project-client/models/TeamsToken.md)                                     |             |
| [WebPushTokenCollection](docs/project-client/models/WebPushTokenCollection.md)             |             |
| [WebPushToken](docs/project-client/models/WebPushToken.md)                                 |             |
| [EventCollection](docs/project-client/models/EventCollection.md)                           |             |
| [Event](docs/project-client/models/Event.md)                                               |             |
| [Links](docs/project-client/models/Links.md)                                               |             |
| [IntegrationConfigCollection](docs/project-client/models/IntegrationConfigCollection.md)   |             |
| [IntegrationConfig](docs/project-client/models/IntegrationConfig.md)                       |             |
| [Links](docs/project-client/models/Links.md)                                               |             |
| [ApnsConfigCollection](docs/project-client/models/ApnsConfigCollection.md)                 |             |
| [ApnsConfig](docs/project-client/models/ApnsConfig.md)                                     |             |
| [ApnsConfigPayload](docs/project-client/models/ApnsConfigPayload.md)                       |             |
| [ExpoConfigCollection](docs/project-client/models/ExpoConfigCollection.md)                 |             |
| [ExpoConfig](docs/project-client/models/ExpoConfig.md)                                     |             |
| [ExpoConfigPayload](docs/project-client/models/ExpoConfigPayload.md)                       |             |
| [FcmConfigCollection](docs/project-client/models/FcmConfigCollection.md)                   |             |
| [FcmConfig](docs/project-client/models/FcmConfig.md)                                       |             |
| [FcmConfigPayload](docs/project-client/models/FcmConfigPayload.md)                         |             |
| [InboxConfigCollection](docs/project-client/models/InboxConfigCollection.md)               |             |
| [InboxConfig](docs/project-client/models/InboxConfig.md)                                   |             |
| [InboxConfigPayload](docs/project-client/models/InboxConfigPayload.md)                     |             |
| [MailgunConfigCollection](docs/project-client/models/MailgunConfigCollection.md)           |             |
| [MailgunConfig](docs/project-client/models/MailgunConfig.md)                               |             |
| [MailgunConfigPayload](docs/project-client/models/MailgunConfigPayload.md)                 |             |
| [PingConfigCollection](docs/project-client/models/PingConfigCollection.md)                 |             |
| [PingConfig](docs/project-client/models/PingConfig.md)                                     |             |
| [PingConfigPayload](docs/project-client/models/PingConfigPayload.md)                       |             |
| [SendgridConfigCollection](docs/project-client/models/SendgridConfigCollection.md)         |             |
| [SendgridConfig](docs/project-client/models/SendgridConfig.md)                             |             |
| [SendgridConfigPayload](docs/project-client/models/SendgridConfigPayload.md)               |             |
| [SesConfigCollection](docs/project-client/models/SesConfigCollection.md)                   |             |
| [SesConfig](docs/project-client/models/SesConfig.md)                                       |             |
| [SesConfigPayload](docs/project-client/models/SesConfigPayload.md)                         |             |
| [SlackConfigCollection](docs/project-client/models/SlackConfigCollection.md)               |             |
| [SlackConfig](docs/project-client/models/SlackConfig.md)                                   |             |
| [SlackConfigPayload](docs/project-client/models/SlackConfigPayload.md)                     |             |
| [TwilioConfigCollection](docs/project-client/models/TwilioConfigCollection.md)             |             |
| [TwilioConfig](docs/project-client/models/TwilioConfig.md)                                 |             |
| [TwilioConfigPayload](docs/project-client/models/TwilioConfigPayload.md)                   |             |
| [WebpushConfigCollection](docs/project-client/models/WebpushConfigCollection.md)           |             |
| [WebpushConfig](docs/project-client/models/WebpushConfig.md)                               |             |
| [WebpushConfigPayload](docs/project-client/models/WebpushConfigPayload.md)                 |             |
| [UserCollection](docs/project-client/models/UserCollection.md)                             |             |
| [User](docs/project-client/models/User.md)                                                 |             |
| [Links](docs/project-client/models/Links.md)                                               |             |

</details>

<!-- AUTO-GENERATED-CONTENT:END (project-client) -->

# UserClient

<!-- AUTO-GENERATED-CONTENT:START (user-client) -->

## Authentication

### Access Token Authentication

The Client API uses an Access Token for authentication.

This token must be provided to authenticate your requests to the API.

#### Setting the Access Token

When you initialize the SDK, you can set the access token as follows:

```ts
const sdk = new Client({ token: 'YOUR_TOKEN' });
```

If you need to set or update the access token after initializing the SDK, you can use:

```ts
const sdk = new Client();
sdk.token = 'YOUR_TOKEN';
```

## Setting a Custom Timeout

You can set a custom timeout for the SDK's HTTP requests as follows:

```ts
const client = new Client({ timeout: 10000 });
```

## Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listInboxTokens({
    limit: 5,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

### Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                                      |
| :------------------------------------------------------------------------ |
| [ChannelsService](docs/user-client/services/ChannelsService.md)           |
| [IntegrationsService](docs/user-client/services/IntegrationsService.md)   |
| [NotificationsService](docs/user-client/services/NotificationsService.md) |

</details>

### Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                            | Description |
| :---------------------------------------------------------------------------------------------- | :---------- |
| [InboxTokenResponseCollection](docs/user-client/models/InboxTokenResponseCollection.md)         |             |
| [InboxTokenResponse](docs/user-client/models/InboxTokenResponse.md)                             |             |
| [Links](docs/user-client/models/Links.md)                                                       |             |
| [InboxToken](docs/user-client/models/InboxToken.md)                                             |             |
| [DiscardResult](docs/user-client/models/DiscardResult.md)                                       |             |
| [ApnsTokenCollection](docs/user-client/models/ApnsTokenCollection.md)                           |             |
| [ApnsToken](docs/user-client/models/ApnsToken.md)                                               |             |
| [ApnsTokenPayload](docs/user-client/models/ApnsTokenPayload.md)                                 |             |
| [ExpoTokenCollection](docs/user-client/models/ExpoTokenCollection.md)                           |             |
| [ExpoToken](docs/user-client/models/ExpoToken.md)                                               |             |
| [ExpoTokenPayload](docs/user-client/models/ExpoTokenPayload.md)                                 |             |
| [FcmTokenCollection](docs/user-client/models/FcmTokenCollection.md)                             |             |
| [FcmToken](docs/user-client/models/FcmToken.md)                                                 |             |
| [FcmTokenPayload](docs/user-client/models/FcmTokenPayload.md)                                   |             |
| [SlackTokenCollection](docs/user-client/models/SlackTokenCollection.md)                         |             |
| [SlackToken](docs/user-client/models/SlackToken.md)                                             |             |
| [SlackTokenPayload](docs/user-client/models/SlackTokenPayload.md)                               |             |
| [TeamsTokenCollection](docs/user-client/models/TeamsTokenCollection.md)                         |             |
| [TeamsToken](docs/user-client/models/TeamsToken.md)                                             |             |
| [TeamsTokenPayload](docs/user-client/models/TeamsTokenPayload.md)                               |             |
| [WebPushTokenCollection](docs/user-client/models/WebPushTokenCollection.md)                     |             |
| [WebPushToken](docs/user-client/models/WebPushToken.md)                                         |             |
| [WebPushTokenPayload](docs/user-client/models/WebPushTokenPayload.md)                           |             |
| [InboxConfigPayload](docs/user-client/models/InboxConfigPayload.md)                             |             |
| [SlackInstallation](docs/user-client/models/SlackInstallation.md)                               |             |
| [SlackFinishInstallResponse](docs/user-client/models/SlackFinishInstallResponse.md)             |             |
| [SlackStartInstall](docs/user-client/models/SlackStartInstall.md)                               |             |
| [SlackStartInstallResponseContent](docs/user-client/models/SlackStartInstallResponseContent.md) |             |
| [WebPushTokenPayload](docs/user-client/models/WebPushTokenPayload.md)                           |             |
| [WebPushStartInstallationResponse](docs/user-client/models/WebPushStartInstallationResponse.md) |             |
| [NotificationCollection](docs/user-client/models/NotificationCollection.md)                     |             |
| [Notification](docs/user-client/models/Notification.md)                                         |             |
| [Links](docs/user-client/models/Links.md)                                                       |             |

</details>

<!-- AUTO-GENERATED-CONTENT:END (user-client) -->
