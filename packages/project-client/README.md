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
    pageSize: 10,
    pageBefore: 'page[before]',
    pageAfter: 'page[after]',
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
| [IntegrationsService](documentation/services/IntegrationsService.md) |
| [JwtService](documentation/services/JwtService.md)                   |
| [ChannelsService](documentation/services/ChannelsService.md)         |

</details>

## Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                       | Description |
| :----------------------------------------------------------------------------------------- | :---------- |
| [BroadcastListResponse](documentation/models/BroadcastListResponse.md)                     |             |
| [Broadcast](documentation/models/Broadcast.md)                                             |             |
| [ListIntegrationsResponse](documentation/models/ListIntegrationsResponse.md)               |             |
| [ApnsConfig](documentation/models/ApnsConfig.md)                                           |             |
| [AwssnsConfig](documentation/models/AwssnsConfig.md)                                       |             |
| [ExpoConfig](documentation/models/ExpoConfig.md)                                           |             |
| [FcmConfig](documentation/models/FcmConfig.md)                                             |             |
| [GithubConfig](documentation/models/GithubConfig.md)                                       |             |
| [InboxConfig](documentation/models/InboxConfig.md)                                         |             |
| [MailgunConfig](documentation/models/MailgunConfig.md)                                     |             |
| [PingConfig](documentation/models/PingConfig.md)                                           |             |
| [SendgridConfig](documentation/models/SendgridConfig.md)                                   |             |
| [SesConfig](documentation/models/SesConfig.md)                                             |             |
| [SlackConfig](documentation/models/SlackConfig.md)                                         |             |
| [StripeConfig](documentation/models/StripeConfig.md)                                       |             |
| [TwilioConfig](documentation/models/TwilioConfig.md)                                       |             |
| [WebpushConfig](documentation/models/WebpushConfig.md)                                     |             |
| [FetchTokensResponse](documentation/models/FetchTokensResponse.md)                         |             |
| [CreateProjectTokenRequest](documentation/models/CreateProjectTokenRequest.md)             |             |
| [AccessToken](documentation/models/AccessToken.md)                                         |             |
| [DiscardTokenResponse](documentation/models/DiscardTokenResponse.md)                       |             |
| [CreateUserTokenRequest](documentation/models/CreateUserTokenRequest.md)                   |             |
| [ArrayWithMetadataOfApnsToken](documentation/models/ArrayWithMetadataOfApnsToken.md)       |             |
| [ApnsTokenWithMetadata](documentation/models/ApnsTokenWithMetadata.md)                     |             |
| [DiscardResult](documentation/models/DiscardResult.md)                                     |             |
| [ArrayWithMetadataOfExpoToken](documentation/models/ArrayWithMetadataOfExpoToken.md)       |             |
| [ExpoTokenWithMetadata](documentation/models/ExpoTokenWithMetadata.md)                     |             |
| [ArrayWithMetadataOfFcmToken](documentation/models/ArrayWithMetadataOfFcmToken.md)         |             |
| [FcmTokenWithMetadata](documentation/models/FcmTokenWithMetadata.md)                       |             |
| [ArrayWithMetadataOfSlackToken](documentation/models/ArrayWithMetadataOfSlackToken.md)     |             |
| [SlackTokenWithMetadata](documentation/models/SlackTokenWithMetadata.md)                   |             |
| [ArrayWithMetadataOfTeamsToken](documentation/models/ArrayWithMetadataOfTeamsToken.md)     |             |
| [TeamsTokenWithMetadata](documentation/models/TeamsTokenWithMetadata.md)                   |             |
| [ArrayWithMetadataOfWebPushToken](documentation/models/ArrayWithMetadataOfWebPushToken.md) |             |
| [WebPushTokenWithMetadata](documentation/models/WebPushTokenWithMetadata.md)               |             |
| [ApnsToken](documentation/models/ApnsToken.md)                                             |             |
| [ExpoToken](documentation/models/ExpoToken.md)                                             |             |
| [FcmToken](documentation/models/FcmToken.md)                                               |             |
| [SlackToken](documentation/models/SlackToken.md)                                           |             |
| [TeamsToken](documentation/models/TeamsToken.md)                                           |             |
| [WebPushToken](documentation/models/WebPushToken.md)                                       |             |

</details>