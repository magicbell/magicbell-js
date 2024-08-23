# Client TypeScript SDK 0.2.0

Welcome to the Client SDK documentation. This guide will help you get started with integrating and using the Client SDK in your project.

## Versions

- API version: `2.0.0`
- SDK version: `0.2.0`

## About the API

OpenAPI 3.1.0 Specification for MagicBell API.

## Table of Contents

- [Setup & Configuration](#setup--configuration)
  - [Supported Language Versions](#supported-language-versions)
  - [Installation](#installation)
- [Authentication](#authentication)
  - [Access Token Authentication](#access-token-authentication)
- [Setting a Custom Timeout](#setting-a-custom-timeout)
- [Services](#services)
- [Models](#models)

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install @magicbell/user-client
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

## Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                                 |
| :------------------------------------------------------------------- |
| [ChannelsService](documentation/services/ChannelsService.md)         |
| [IntegrationsService](documentation/services/IntegrationsService.md) |

</details>

## Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                         | Description |
| :------------------------------------------------------------------------------------------- | :---------- |
| [ArrayWithMetadataOfInboxToken](documentation/models/ArrayWithMetadataOfInboxToken.md)       |             |
| [InboxToken](documentation/models/InboxToken.md)                                             |             |
| [InboxTokenWithMetadata](documentation/models/InboxTokenWithMetadata.md)                     |             |
| [DiscardResult](documentation/models/DiscardResult.md)                                       |             |
| [ArrayWithMetadataOfApnsToken](documentation/models/ArrayWithMetadataOfApnsToken.md)         |             |
| [ApnsToken](documentation/models/ApnsToken.md)                                               |             |
| [ApnsTokenWithMetadata](documentation/models/ApnsTokenWithMetadata.md)                       |             |
| [ArrayWithMetadataOfFcmToken](documentation/models/ArrayWithMetadataOfFcmToken.md)           |             |
| [FcmToken](documentation/models/FcmToken.md)                                                 |             |
| [FcmTokenWithMetadata](documentation/models/FcmTokenWithMetadata.md)                         |             |
| [ArrayWithMetadataOfSlackToken](documentation/models/ArrayWithMetadataOfSlackToken.md)       |             |
| [SlackToken](documentation/models/SlackToken.md)                                             |             |
| [SlackTokenWithMetadata](documentation/models/SlackTokenWithMetadata.md)                     |             |
| [ArrayWithMetadataOfTeamsToken](documentation/models/ArrayWithMetadataOfTeamsToken.md)       |             |
| [TeamsTokenWithMetadata](documentation/models/TeamsTokenWithMetadata.md)                     |             |
| [ArrayWithMetadataOfWebPushToken](documentation/models/ArrayWithMetadataOfWebPushToken.md)   |             |
| [WebPushToken](documentation/models/WebPushToken.md)                                         |             |
| [WebPushTokenWithMetadata](documentation/models/WebPushTokenWithMetadata.md)                 |             |
| [InboxConfig](documentation/models/InboxConfig.md)                                           |             |
| [SlackInstallation](documentation/models/SlackInstallation.md)                               |             |
| [SlackFinishInstallResponse](documentation/models/SlackFinishInstallResponse.md)             |             |
| [SlackStartInstall](documentation/models/SlackStartInstall.md)                               |             |
| [TemplatesInstallation](documentation/models/TemplatesInstallation.md)                       |             |
| [WebPushStartInstallationResponse](documentation/models/WebPushStartInstallationResponse.md) |             |

</details>
