---
title: 'magicbell-js/project-client'
---

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm` or `yarn`:

```bash
npm install magicbell-js
```

or

```bash
yarn add magicbell-js/project-client
```

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
    limit: 10,
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

| Name                                                   |
| :----------------------------------------------------- |
| [BroadcastsService](services/BroadcastsService.md)     |
| [ChannelsService](services/ChannelsService.md)         |
| [EventsService](services/EventsService.md)             |
| [IntegrationsService](services/IntegrationsService.md) |
| [UsersService](services/UsersService.md)               |
| [WorkflowsService](services/WorkflowsService.md)       |

</details>

### Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details>
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                   | Description |
| :--------------------------------------------------------------------- | :---------- |
| [BroadcastCollection](models/BroadcastCollection.md)                   |             |
| [Broadcast](models/Broadcast.md)                                       |             |
| [User](models/User.md)                                                 |             |
| [Links](models/Links.md)                                               |             |
| [CategoryDeliveryConfig](models/CategoryDeliveryConfig.md)             |             |
| [InboxTokenResponseCollection](models/InboxTokenResponseCollection.md) |             |
| [InboxTokenResponse](models/InboxTokenResponse.md)                     |             |
| [Links](models/Links.md)                                               |             |
| [DiscardResult](models/DiscardResult.md)                               |             |
| [ApnsTokenCollection](models/ApnsTokenCollection.md)                   |             |
| [ApnsToken](models/ApnsToken.md)                                       |             |
| [ExpoTokenCollection](models/ExpoTokenCollection.md)                   |             |
| [ExpoToken](models/ExpoToken.md)                                       |             |
| [FcmTokenCollection](models/FcmTokenCollection.md)                     |             |
| [FcmToken](models/FcmToken.md)                                         |             |
| [SlackTokenCollection](models/SlackTokenCollection.md)                 |             |
| [SlackToken](models/SlackToken.md)                                     |             |
| [TeamsTokenCollection](models/TeamsTokenCollection.md)                 |             |
| [TeamsToken](models/TeamsToken.md)                                     |             |
| [WebPushTokenCollection](models/WebPushTokenCollection.md)             |             |
| [WebPushToken](models/WebPushToken.md)                                 |             |
| [EventCollection](models/EventCollection.md)                           |             |
| [Event](models/Event.md)                                               |             |
| [Links](models/Links.md)                                               |             |
| [IntegrationConfigCollection](models/IntegrationConfigCollection.md)   |             |
| [IntegrationConfig](models/IntegrationConfig.md)                       |             |
| [Links](models/Links.md)                                               |             |
| [ApnsConfigCollection](models/ApnsConfigCollection.md)                 |             |
| [ApnsConfig](models/ApnsConfig.md)                                     |             |
| [ApnsConfigPayload](models/ApnsConfigPayload.md)                       |             |
| [EventSourceConfigCollection](models/EventSourceConfigCollection.md)   |             |
| [EventSourceConfig](models/EventSourceConfig.md)                       |             |
| [EventSourceConfigPayload](models/EventSourceConfigPayload.md)         |             |
| [ExpoConfigCollection](models/ExpoConfigCollection.md)                 |             |
| [ExpoConfig](models/ExpoConfig.md)                                     |             |
| [ExpoConfigPayload](models/ExpoConfigPayload.md)                       |             |
| [FcmConfigCollection](models/FcmConfigCollection.md)                   |             |
| [FcmConfig](models/FcmConfig.md)                                       |             |
| [FcmConfigPayload](models/FcmConfigPayload.md)                         |             |
| [GithubConfigCollection](models/GithubConfigCollection.md)             |             |
| [GithubConfig](models/GithubConfig.md)                                 |             |
| [GithubConfigPayload](models/GithubConfigPayload.md)                   |             |
| [InboxConfigCollection](models/InboxConfigCollection.md)               |             |
| [InboxConfig](models/InboxConfig.md)                                   |             |
| [InboxConfigPayload](models/InboxConfigPayload.md)                     |             |
| [SlackBotConfigCollection](models/SlackBotConfigCollection.md)         |             |
| [SlackBotConfig](models/SlackBotConfig.md)                             |             |
| [SlackBotConfigPayload](models/SlackBotConfigPayload.md)               |             |
| [MailgunConfigCollection](models/MailgunConfigCollection.md)           |             |
| [MailgunConfig](models/MailgunConfig.md)                               |             |
| [MailgunConfigPayload](models/MailgunConfigPayload.md)                 |             |
| [PingConfigCollection](models/PingConfigCollection.md)                 |             |
| [PingConfig](models/PingConfig.md)                                     |             |
| [PingConfigPayload](models/PingConfigPayload.md)                       |             |
| [SendgridConfigCollection](models/SendgridConfigCollection.md)         |             |
| [SendgridConfig](models/SendgridConfig.md)                             |             |
| [SendgridConfigPayload](models/SendgridConfigPayload.md)               |             |
| [SesConfigCollection](models/SesConfigCollection.md)                   |             |
| [SesConfig](models/SesConfig.md)                                       |             |
| [SesConfigPayload](models/SesConfigPayload.md)                         |             |
| [SlackConfigCollection](models/SlackConfigCollection.md)               |             |
| [SlackConfig](models/SlackConfig.md)                                   |             |
| [SlackConfigPayload](models/SlackConfigPayload.md)                     |             |
| [SmtpConfigObjectCollection](models/SmtpConfigObjectCollection.md)     |             |
| [SmtpConfigObject](models/SmtpConfigObject.md)                         |             |
| [SmtpConfig](models/SmtpConfig.md)                                     |             |
| [StripeConfigCollection](models/StripeConfigCollection.md)             |             |
| [StripeConfig](models/StripeConfig.md)                                 |             |
| [StripeConfigPayload](models/StripeConfigPayload.md)                   |             |
| [TwilioConfigCollection](models/TwilioConfigCollection.md)             |             |
| [TwilioConfig](models/TwilioConfig.md)                                 |             |
| [TwilioConfigPayload](models/TwilioConfigPayload.md)                   |             |
| [WebpushConfigCollection](models/WebpushConfigCollection.md)           |             |
| [WebpushConfig](models/WebpushConfig.md)                               |             |
| [WebpushConfigPayload](models/WebpushConfigPayload.md)                 |             |
| [UserCollection](models/UserCollection.md)                             |             |
| [User](models/User.md)                                                 |             |
| [Links](models/Links.md)                                               |             |
| [WorkflowDefinition](models/WorkflowDefinition.md)                     |             |
| [ExecuteWorkflowRequest](models/ExecuteWorkflowRequest.md)             |             |
| [CreateRunResponse](models/CreateRunResponse.md)                       |             |
| [GetRunResponse](models/GetRunResponse.md)                             |             |
| [WorkflowRunCollection](models/WorkflowRunCollection.md)               |             |
| [WorkflowRun](models/WorkflowRun.md)                                   |             |
| [Links](models/Links.md)                                               |             |

</details>
