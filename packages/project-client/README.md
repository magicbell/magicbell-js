# Client TypeScript SDK 0.1.0

Welcome to the Client SDK documentation. This guide will help you get started with integrating and using the Client SDK in your project.

## Versions

- API version: `2.0.0`
- SDK version: `0.1.0`

## About the API

OpenAPI 3.1.0 Specification for MagicBell API.

## Table of Contents

- [Setup & Configuration](#setup--configuration)
  - [Supported Language Versions](#supported-language-versions)
  - [Installation](#installation)
- [Authentication](#authentication)
  - [Access Token Authentication](#access-token-authentication)
- [Setting a Custom Timeout](#setting-a-custom-timeout)
- [Sample Usage](#sample-usage)
- [Services](#services)
- [Models](#models)

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install @magicbell/project-client
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

# Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.listBroadcasts({
    pageSize: 6,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
  });

  console.log(data);
})();
```

## Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                                 |
| :------------------------------------------------------------------- |
| [BroadcastsService](documentation/services/BroadcastsService.md)     |
| [ChannelsService](documentation/services/ChannelsService.md)         |
| [EventsService](documentation/services/EventsService.md)             |
| [IntegrationsService](documentation/services/IntegrationsService.md) |
| [JwtService](documentation/services/JwtService.md)                   |

</details>

## Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                         | Description |
| :------------------------------------------------------------------------------------------- | :---------- |
| [ArrayOfBroadcasts](documentation/models/ArrayOfBroadcasts.md)                               |             |
| [Broadcast](documentation/models/Broadcast.md)                                               |             |
| [ProjectDeliveryConfig](documentation/models/ProjectDeliveryConfig.md)                       |             |
| [CategoryDeliveryConfig](documentation/models/CategoryDeliveryConfig.md)                     |             |
| [ArrayOfMetadataApnsTokens](documentation/models/ArrayOfMetadataApnsTokens.md)               |             |
| [MetadataApnsToken](documentation/models/MetadataApnsToken.md)                               |             |
| [DiscardResult](documentation/models/DiscardResult.md)                                       |             |
| [ArrayOfMetadataExpoTokens](documentation/models/ArrayOfMetadataExpoTokens.md)               |             |
| [MetadataExpoToken](documentation/models/MetadataExpoToken.md)                               |             |
| [ArrayOfMetadataFcmTokens](documentation/models/ArrayOfMetadataFcmTokens.md)                 |             |
| [MetadataFcmToken](documentation/models/MetadataFcmToken.md)                                 |             |
| [ArrayOfMetadataSlackTokens](documentation/models/ArrayOfMetadataSlackTokens.md)             |             |
| [MetadataSlackToken](documentation/models/MetadataSlackToken.md)                             |             |
| [ArrayOfMetadataTeamsTokens](documentation/models/ArrayOfMetadataTeamsTokens.md)             |             |
| [MetadataTeamsToken](documentation/models/MetadataTeamsToken.md)                             |             |
| [ArrayOfMetadataWebPushTokens](documentation/models/ArrayOfMetadataWebPushTokens.md)         |             |
| [MetadataWebPushToken](documentation/models/MetadataWebPushToken.md)                         |             |
| [ArrayOfEvents](documentation/models/ArrayOfEvents.md)                                       |             |
| [ArrayOfIntegrationObjects](documentation/models/ArrayOfIntegrationObjects.md)               |             |
| [ArrayOfApnsConfigObjects](documentation/models/ArrayOfApnsConfigObjects.md)                 |             |
| [ApnsConfig](documentation/models/ApnsConfig.md)                                             |             |
| [ArrayOfAwssnsConfigObjects](documentation/models/ArrayOfAwssnsConfigObjects.md)             |             |
| [AwssnsConfig](documentation/models/AwssnsConfig.md)                                         |             |
| [ArrayOfExpoConfigObjects](documentation/models/ArrayOfExpoConfigObjects.md)                 |             |
| [ExpoConfig](documentation/models/ExpoConfig.md)                                             |             |
| [ArrayOfFcmConfigObjects](documentation/models/ArrayOfFcmConfigObjects.md)                   |             |
| [FcmConfig](documentation/models/FcmConfig.md)                                               |             |
| [ArrayOfGithubConfigObjects](documentation/models/ArrayOfGithubConfigObjects.md)             |             |
| [GithubConfig](documentation/models/GithubConfig.md)                                         |             |
| [ArrayOfInboxConfigObjects](documentation/models/ArrayOfInboxConfigObjects.md)               |             |
| [InboxConfig](documentation/models/InboxConfig.md)                                           |             |
| [ArrayOfMailgunConfigObjects](documentation/models/ArrayOfMailgunConfigObjects.md)           |             |
| [MailgunConfig](documentation/models/MailgunConfig.md)                                       |             |
| [ArrayOfPingConfigObjects](documentation/models/ArrayOfPingConfigObjects.md)                 |             |
| [PingConfig](documentation/models/PingConfig.md)                                             |             |
| [ArrayOfSendgridConfigObjects](documentation/models/ArrayOfSendgridConfigObjects.md)         |             |
| [SendgridConfig](documentation/models/SendgridConfig.md)                                     |             |
| [ArrayOfSesConfigObjects](documentation/models/ArrayOfSesConfigObjects.md)                   |             |
| [SesConfig](documentation/models/SesConfig.md)                                               |             |
| [ArrayOfSlackConfigObjects](documentation/models/ArrayOfSlackConfigObjects.md)               |             |
| [SlackConfig](documentation/models/SlackConfig.md)                                           |             |
| [ArrayOfStripeConfigObjects](documentation/models/ArrayOfStripeConfigObjects.md)             |             |
| [StripeConfig](documentation/models/StripeConfig.md)                                         |             |
| [ArrayOfTemplatesConfigObjects](documentation/models/ArrayOfTemplatesConfigObjects.md)       |             |
| [ArrayOfTwilioConfigObjects](documentation/models/ArrayOfTwilioConfigObjects.md)             |             |
| [TwilioConfig](documentation/models/TwilioConfig.md)                                         |             |
| [ArrayOfWebpushConfigObjects](documentation/models/ArrayOfWebpushConfigObjects.md)           |             |
| [WebpushConfig](documentation/models/WebpushConfig.md)                                       |             |
| [ArrayOfFetchTokensResponseTokens](documentation/models/ArrayOfFetchTokensResponseTokens.md) |             |
| [CreateProjectTokenRequest](documentation/models/CreateProjectTokenRequest.md)               |             |
| [AccessToken](documentation/models/AccessToken.md)                                           |             |
| [DiscardTokenResponse](documentation/models/DiscardTokenResponse.md)                         |             |
| [CreateUserTokenRequest](documentation/models/CreateUserTokenRequest.md)                     |             |
| [Links](documentation/models/Links.md)                                                       |             |
| [ApnsToken](documentation/models/ApnsToken.md)                                               |             |
| [TokenMetadata](documentation/models/TokenMetadata.md)                                       |             |
| [ExpoToken](documentation/models/ExpoToken.md)                                               |             |
| [FcmToken](documentation/models/FcmToken.md)                                                 |             |
| [SlackToken](documentation/models/SlackToken.md)                                             |             |
| [TeamsToken](documentation/models/TeamsToken.md)                                             |             |
| [WebPushToken](documentation/models/WebPushToken.md)                                         |             |
| [Event](documentation/models/Event.md)                                                       |             |
| [IntegrationObject](documentation/models/IntegrationObject.md)                               |             |
| [ApnsConfigObject](documentation/models/ApnsConfigObject.md)                                 |             |
| [AwssnsConfigObject](documentation/models/AwssnsConfigObject.md)                             |             |
| [ExpoConfigObject](documentation/models/ExpoConfigObject.md)                                 |             |
| [FcmConfigObject](documentation/models/FcmConfigObject.md)                                   |             |
| [GithubConfigObject](documentation/models/GithubConfigObject.md)                             |             |
| [InboxConfigObject](documentation/models/InboxConfigObject.md)                               |             |
| [MailgunConfigObject](documentation/models/MailgunConfigObject.md)                           |             |
| [PingConfigObject](documentation/models/PingConfigObject.md)                                 |             |
| [SendgridConfigObject](documentation/models/SendgridConfigObject.md)                         |             |
| [SesConfigObject](documentation/models/SesConfigObject.md)                                   |             |
| [SlackConfigObject](documentation/models/SlackConfigObject.md)                               |             |
| [StripeConfigObject](documentation/models/StripeConfigObject.md)                             |             |
| [TemplatesConfigObject](documentation/models/TemplatesConfigObject.md)                       |             |
| [TwilioConfigObject](documentation/models/TwilioConfigObject.md)                             |             |
| [WebpushConfigObject](documentation/models/WebpushConfigObject.md)                           |             |
| [FetchTokensResponseToken](documentation/models/FetchTokensResponseToken.md)                 |             |

</details>
